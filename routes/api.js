/*

Routes for /api URLs.

*/

var expressJWT = require("express-jwt");
var db_pooler = require(global.__base + "db_pooler");
var auth = require(global.__base + "routes/auth");
var async = require("async");
var fs = require("fs");

//
//The HTTP reply to a (already handled) file upload
//
exports.uploadFileRoute = function(req, res){
    console.log("File uploaded");
    console.log(req.file.originalname, req.file.size);
    res.sendStatus(200);
}
//
//Insert entries in songs, postables, and posts tables for an uploaded song file as well as handle
//storing the uploaded file on the server.
//
exports.handleUpload = function(req, file, cb){
    //add entries to postables, posts, and songs tables in db
    if(!auth.reqIsLoggedIn(req)){
        console.error("User tried to upload file without logging in");
        return cb(new Error("User tried to upload file without logging in"));
    }
    var db_pool = db_pooler();
    db_pool.connect(function(err, client, done){
        if(err){
            console.error("Error fetching client from pool", err);
            return cb(err);
        }
        //TODO: escape user input for title
        client.query({
            name: "insert-postable",
            text: "INSERT INTO postables (userid, title, category, timestamp) VALUES ($1, $2, $3, $4) RETURNING id",
            values: [req.session.userInfo.userid, req.body.title || "Untitled", 0, Math.round(Date.now()/1000)]
        }, function(err, result){
            if(err){
                done();
                return cb(new Error("Error inserting song into postables table"));
            }
            var postableid = result.rows[0].id;
            var filename = postableid + ".mp3";
            client.query({
                name: "insert-song",
                text: "INSERT INTO songs (postableid, fileurl, length) VALUES ($1, $2, $3)",
                values: [result.id, filename, 0]
            }, function(err, result){
                if(err){
                    done();
                    return cb(new Error("Error inserting song into songs table"));
                }
                client.query({
                    name: "insert-post",
                    text: "INSERT INTO posts (userid, postableid, timestamp) VALUES ($1, $2, $3)",
                    values: [req.session.userInfo.userid, postableid, Math.round(Date.now()/1000)]
                }, function(err, result){
                    done();
                    if(err){
                        return cb(new Error("Error inserting song into songs table"));
                    }
                    return cb(null, filename);
                });
            });
        });
    });
};

exports.getFeedRoute = function(req, res){
    var db_pool = db_pooler();
    db_pool.connect(function(err, client, done){
        if(err){
           console.error("Error fetching client from pool");
           return res.json({"error":{msg:"server error."}});
        }
        client.query({
            name: "get-all-posts",
            text:   "SELECT " +
                        "posts.timestamp, " +
                        "postables.id, " +
                        "postables.title, " +
                        "postables.category, " +
                        "users.id AS userid, " +
                        "users.username " +
                    "FROM " +
                        "posts " +
                            "INNER JOIN postables " +
                                "ON (posts.id=postables.id) " +
                            "INNER JOIN users " +
                                "ON (posts.userid=users.id)"
        }, function(err, result){
            done();
            if(err){
                console.error("Error querying all posts", err);
                return res.json({"error": {"msg": "server error"}});
            }
            res.json({"posts": result.rows});
        });
    });
};

exports.getSongStream = function(req, res){
    req.assert("songid", "songid missing").notEmpty().isInt();
    var errors = req.validationErrors();
    if(errors){
        //console.error(errors);
        return res.json({"errors": errors});
    }
    
    var filestream = fs.createReadStream(global.__base + "uploads/" + req.params.songid + ".mp3");
    filestream.on("open", function(){
        var stats = fs.statSync(global.__base + "uploads/" + req.params.songid + ".mp3");
        var fileSizeBytes = stats.size;
        res.writeHead(200, {
            "Content-Type": "audio/mpeg",
            "Content-Length": fileSizeBytes
        });
        filestream.pipe(res);
    });
}