/*

Routes for /api URLs.

*/

var expressJWT = require("express-jwt");


exports.uploadFileRoute = function(req, res){
    console.log("File uploaded");
    console.log(req.file.originalname, req.file.size);
    res.sendStatus(200);
}