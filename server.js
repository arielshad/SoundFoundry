//
// # SoundFoundry
//
// A simple media server using ExpressJS and Postgres.
//
var http = require('http');
var path = require('path');

var async = require('async');
var express = require('express');
var validator = require("express-validator");
var bodyParser = require("body-parser");
//
global.__base = __dirname + "/";

// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var app = express();
var router = require(__dirname + "/routes");


//
//
//Initialize app to use various dependencies.
//
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());
app.use(express.static(path.resolve(__dirname, 'static')));
router.createRoutes(app);


//
//environment var stuff
//
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("swig").renderFile);

var listener = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = listener.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
