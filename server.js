//
// # SoundFoundry
//
// A simple media server using ExpressJS and Postgres.
//
var http = require('http');
var path = require('path');
var express = require('express');
var async = require('async');

//
//global constants.
//
global.__base = __dirname + "/";
global.__secret = require("fs").readFileSync("secret_key", {encoding: "ascii"});
//
//
//

// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var app = express();
var router = require(__dirname + "/routes");

//
//Initialize app Middleware.
//
var validator = require("express-validator");
var bodyParser = require("body-parser");
var session = require("express-session");
var pgSession = require("connect-pg-simple")(session);
var helmet = require("helmet");
//
//
//Initialize app to use middleware.
//
//
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());
//session middleware
app.use(session({
  store: new pgSession({
    pg: require("pg") //use global pg module
  }),
  saveUninitialized: true,
  secret: global.__secret,
  resave: false,
  cookie: {httpOnly: true, maxAge: 30*24*60*60*1000} //{httpOnly: true, secure: true, maxAge: 30*24*60*60*1000} //max age of 30 days
}));
//create routes with routes/index.js
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(path.resolve(__dirname, 'client/builds')));
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
