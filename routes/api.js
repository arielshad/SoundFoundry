/*

Routes for /api URLs.

*/

var auth = require(__base + "auth/authorizer");
var expressJWT = require("express-jwt");
var express = require("express");

exports.registerRoute = function(req, res){
    req.assert("password", "A password is required").notEmpty();
    req.assert("username", "A username is required").notEmpty();
    req.assert("email", "A valid email is required").notEmpty().isEmail();
    
    var errors = req.validationErrors();
    if(errors){
        console.error(errors);
        res.json({"errors": errors});
    }
    else{
        auth.registerUser(req.body.email, req.body.username, req.body.password, function(output){
            if(output.error){
                res.json(
                    {"errors": [
                        {"msg": output.error}
                    ]}
                );
            }
            res.json(output); //send auth token if no error
        });
    }
}

exports.authenticateRoute = function(req, res){
    req.assert("password", "A password is required").notEmpty();
    req.assert("username", "A username is required").notEmpty();
    req.assert("email", "A valid email is required").notEmpty().isEmail();
    
    var errors = req.validationErrors();
    if(errors){
        console.error(errors);
        res.json({"errors": errors});
    }
    else{
        auth.verifyUser(req.body.email, req.body.password, function(output){
            if(output.error){
                res.json(
                    {"errors": [
                        {"msg": output.error}
                    ]}
                );
            }
            res.json(output); //send auth token if no error
        });
    }
}