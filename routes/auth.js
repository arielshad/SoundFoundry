/*

Routes for user authorization stuff.

*/

var auth = require(global.__base + "auth/authorizer");

//
//Validates user input, then tells the authorizer to try to add the new user to the database. Response is either an errors object or userInfo {email, username, userid} JSON.
//
exports.registerRoute = function(req, res){
    req.assert("password", "A password is required").notEmpty();
    req.assert("username", "A username is required").notEmpty();
    req.assert("email", "A valid email is required").notEmpty().isEmail();
    
    var errors = req.validationErrors();
    if(errors){
        //console.error(errors);
        res.json({"errors": errors});
    }
    else{
        auth.registerUser(req.body.email, req.body.username, req.body.password, function(userInfo){
            if(userInfo.error){
                res.json(
                    {"errors": [
                        {"msg": userInfo.error}
                    ]}
                );
                return;
            }
            //if no error, write userInfo {email, username, userid} to session data
            req.session.userInfo = userInfo;
            //TODO: ONLY RETURN ESCAPED INPUT TO THE CLIENT!!
            res.json(userInfo);
        });
    }
}

exports.authenticateRoute = function(req, res){
    req.assert("password", "A password is required").notEmpty();
    req.assert("email", "A valid email is required").notEmpty().isEmail();
    
    var errors = req.validationErrors();
    if(errors){
        //console.error(errors);
        res.json({"errors": errors});
    }
    else{
        auth.verifyUser(req.body.email, req.body.password, function(userInfo){
            if(userInfo.error){
                res.json(
                    {"errors": [
                        {"msg": userInfo.error}
                    ]}
                );
                return;
            }
            //if no error, write userInfo to session data
            req.session.userInfo = userInfo;
            //TODO: ONLY RETURN ESCAPED INPUT TO THE CLIENT!!
            res.json(userInfo);
        });
    }
}

//
//Validate that the user is currently signed in with valid cookie, then destroy session if so
//
exports.logoutRoute = function(req, res){
    if(auth.sessionIsLoggedIn(req.session)){
        req.session.destroy();
        res.sendStatus(200);
    }
    else{
        res.json({"errors": [{"msg": "User not currently logged in"}]});
    }
}

exports.reqIsLoggedIn = function(req){
    if(req.session){
        return auth.sessionIsLoggedIn(req.session);
    }
    return false;
}

exports.reqSongStreamToken = function(req, res){
    res.json({
        "token": auth.getSongStreamToken()
    });
}