/*

Router file for all routes.
Also applies single-route middleware where necessary.

*/

var auth = require(global.__base + "routes/auth");
var api = require(global.__base + "routes/api");
var expressJWT = require("express-jwt");
var multer = require("multer");
var upload = multer({dest: "uploads/", 
                    fileFilter: require(global.__base + "mediafs/filefilter"),
                    limits: {fileSize: 2500000}});
var express = require("express");

exports.createRoutes = function(app){
    app.get("/", indexRoute);
    app.get("/upload", uploadRoute);
    
    //authentication methods
    app.post("/a/authenticate", auth.authenticateRoute);
    app.post("/a/register", auth.registerRoute);
    app.post("/a/logout", auth.logoutRoute);
    
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
                    if(auth.reqIsLoggedIn(req)){
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
                    if(auth.reqIsLoggedIn(req)){
                        return JSON.stringify(req.session.userInfo);
                    }
                    return "null"
                }
    });
}