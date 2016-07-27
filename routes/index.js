/*

Router file for all routes.

*/

var api = require(global.__base + "routes/api");
var expressJWT = require("express-jwt");
var express = require("express");

exports.createRoutes = function(app){
    app.get("/", indexRoute);
    app.get("/upload", uploadRoute);
    
    app.use(express.json());
    app.use(express.urlencoded()); //use POST parser on URLs
    //authentication methods
    app.post("/a/authenticate", api.authenticateRoute);
    app.post("/a/register", api.registerRoute);
    
    //explicit api routes
    //we are protecting these with JWT
    app.use("/api", expressJWT({secret: global.__secret}));
}

function indexRoute(req, res){
    //TODO: get ip for homepage stuff
    
    if(req.session.userInfo){
        res.render("index", {
            username: req.session.userInfo.username,
        });
        return;
    }
    res.render("index", {
        username: "anon",
    });
}

function uploadRoute(req, res){
    //upload file page
    
    res.render("upload");
}