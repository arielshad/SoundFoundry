/*

Router file for all routes.
Also applies single-route middleware where necessary.

*/

var api = require(global.__base + "routes/api");
var expressJWT = require("express-jwt");
var multer = require("multer");
var upload = multer({dest: "uploads/", 
                    limits: {fileSize: 2500000}});
var express = require("express");

exports.createRoutes = function(app){
    app.get("/", indexRoute);
    app.get("/upload", uploadRoute);
    
    //authentication methods
    app.post("/a/authenticate", api.authenticateRoute);
    app.post("/a/register", api.registerRoute);
    
    app.post("/upload", upload.single("file"), api.uploadFileRoute);
    
    //explicit api routes
    //we are protecting these with JWT
    app.use("/api", expressJWT({secret: global.__secret}));
}

function indexRoute(req, res){
    //TODO: get ip for homepage stuff
    
    res.render("index", 
                {userInfo: req.session.userInfo, 
                userInfoJSON: function(){
                    if(req.session.userInfo){
                        return JSON.stringify(req.session.userInfo);
                    }
                    return "null"
                }
    });
}

function uploadRoute(req, res){
    //upload file page
    
    res.render("upload", 
                {userInfo: req.session.userInfo, 
                userInfoJSON: function(){
                    if(req.session.userInfo){
                        return JSON.stringify(req.session.userInfo);
                    }
                    return "null"
                }
    });
}