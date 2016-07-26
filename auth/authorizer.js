var db_pooler = require(__base + "db_pool");
var jwt = require("jsonwebtoken");

var bcrypt = require("bcrypt");
const saltRounds = 10;

//
//Asynchronously checks if a user with given email already exists in the database.
//calls onCompletion with the result (true, false) when finished
//
function checkEmailExists(email, onCompletion){
    var db_pool = db_pooler();
    db_pool.connect(function(err, client, done){
        if(err){
            return console.error("Error fetching client from pool", err);
        }
        client.query({
            name: "check-email-exists",
            text: "SELECT * FROM users WHERE email=$1",
            values: [email]
        }, function(err, result){
            done(); //release client back to pool
            onCompletion(result.rows.length !== 0);
        });
    });
}

//
//Insert a new user into the database asynchronously, and call onCompletion when finished, with either a JWT indicating successful insertion or an error message.
//@return
//  None
//@params
//  username        -The new user's username (string)
//  email           -The new user's email (string)
//  password        -The new user's plaintext password (string)
//  onCompletion    -The function to call when finished with the insertion. Should accept JSON as parameter
exports.registerUser = function(email, username, password, onCompletion){
    checkEmailExists(email, function(emailExists){
        if(emailExists){
            onCompletion({"error": "A user with the given email already exists"});
            return;
        }
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err){
                console.error("Error generating salt", err);
                onCompletion({"error": "Server error"});
            }
            bcrypt.hash(password, salt, function(err, hash) {
                if(err){
                    console.error("Error hashing password", err);
                    onCompletion({"error": "Server error"});
                }
                
                //store resulting hash in db along with all other user info
                var db_pool = db_pooler();
                db_pool.connect(function(err, client, done){
                    if(err){
                        console.error("Error fetching client from pool", err);
                        onCompletion({"error": "Database error"});
                    }
                    client.query({
                        name: "insert-user",
                        text:"INSERT INTO users (username, email, passhash, timestamp) VALUES ($1, $2, $3, $4)",
                        values: [username, email, hash, Math.round(Date.now()/1000)]
                    }, function(err, result){
                        //call done to release client back to pool
                        done();
                        if(err){
                            console.error("Error inserting new user into database", err);
                            onCompletion({"error": "Database error"});
                        }
                        onCompletion({
                            "token": jwt.sign({
                                iss: "SoundFoundry",
                                username: username,
                                email: email
                            }, "serverSecretKey")
                        }); //finished all ops successfully, call onCompletion
                    });
                });
            });
        //pyramid of doom ??
        });
    });
}

//
//Verify a user login (email, password) asynchronously, and call onCompletion with the result of the verification 
//(either a signed token indicating login success or error message) when finished.
//@return
//  None
//@params
//  email           -The user email
//  password        -The user password
//  onCompletion    -The function to call when verification completes. Should accept a JSON as parameter
exports.verifyUser = function(email, password, onCompletion){
    var db_pool = db_pooler();
    db_pool.connect(function(err, client, done){
        if(err){
            return console.error("Error fetching client from pool", err);
        }
        client.query({
            name: "verify-user",
            text: "SELECT * FROM users WHERE email=$1",
            values: [email]
        }, function(err, result){
            done(); //release client back to pool
            if(err){
                return console.error("Error fetching passhash for email " + email, err);
            }
            if(result.rows.length === 0){
                console.log("No user entry found for email " + email);
                onCompletion({"error": "Invalid email"});
            }
            if(bcrypt.compare(password, result.rows[0].passhash)){
                onCompletion({
                    "token": jwt.sign({
                        iss: "SoundFoundry",
                        username: result.rows[0].username,
                        email: email
                    }, "serverSecretKey")
                });
            }
            else{
                onCompletion({"error": "Invalid password"});
            }
        });
    });
}