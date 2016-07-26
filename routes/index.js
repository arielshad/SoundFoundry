/*

Router file for all routes.

*/

var api = require("api");
var expressJWT = require("express-jwt");
var express = require("express");

exports.createRoutes = function(app){
    app.get("/", indexRoute);
    app.get("/upload", uploadRoute);
    app.get("/login", loginRoute);
    
    //api routes
    //we are protecting these with JWT
    app.use("/api", expressJWT({secret: "serverSecretKey"}));
    app.use(express.json());
    app.use(express.urlencoded());
    //post methods
    app.post("/a/authenticate", api.authenticateRoute);
    app.post("/a/register", api.registerRoute);
}

function indexRoute(req, res){
    //TODO: get ip for homepage stuff
    
    res.render("index", {
        username: "Eugene"
    });
}

function uploadRoute(req, res){
    //upload file page
    
    res.render("upload");
}