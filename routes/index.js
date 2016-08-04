/*

Router file for all routes.
Also applies single-route middleware where necessary.

*/

var auth = require(global.__base + "routes/auth");
var api = require(global.__base + "routes/api");
var expressJWT = require("express-jwt");
var multer = require("multer");
var storage = multer.diskStorage({
    filename: api.handleUpload,
    destination: "uploads/"
});
var upload = multer({
    fileFilter: require(global.__base + "mediafs/filefilter"),
    storage: storage,
    limits: {fileSize: 50000000}
});
var express = require("express");

exports.createRoutes = function(app){
    app.get("/", indexRoute);
    app.get("/upload", uploadRoute);
    app.get("/feed", api.getFeedRoute);
    app.get("/songstream/:songid", api.getSongStream);
    
    //authentication methods
    app.post("/a/authenticate", auth.authenticateRoute);
    app.post("/a/register", auth.registerRoute);
    app.post("/a/logout", auth.logoutRoute);
    app.post("/a/getstreamtoken", auth.reqSongStreamToken);
    
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