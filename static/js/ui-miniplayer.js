//
//ui-miniplayer.js
//

var uiMiniPlayer = (function(){
    var currentSongInfo;
    
    //public members
    var exports = {};
    
    exports.loadSong = function(postInfo){
        currentSongInfo = postInfo;
    };
    exports.show = function(){
        $("#mp-container").fadeIn(250);
    };
    exports.hide = function(){
        $("#mp-container").fadeOut(250);
    };
    
    return exports;
})();