//
//filefilter.js
//
//A fileFilter function for multer's upload object

module.exports = function(req, file, cb){
    //
    //calls "cb" with err and a boolean to indicate whether req.file should be accepted based on certain criteria.
    //err should usually be null
    
    //
    //TODO: ensure that the file uploaded is of type MP3, MP4, OGG, WAV, FLAC media types
    //also validate metadata
    
    //make sure the user/client who uploaded the file is actually logged in
    if(req.session.userInfo){
        cb(null, true);    
    }
    cb(null, false);
}