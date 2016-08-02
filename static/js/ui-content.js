//
//ui-content.js
//

var uiContent = (function($){
    
    function updateSong($postContainer, $postContent, postInfo){
        $postContainer.find(".post-title").text(postInfo.title);
        $postContainer.find(".post-author").text(postInfo.author);
        $postContent.find(".post-play-btn").click(postInfo.playFunction);
    }
    function updatePlaylist($postContainer, $postContent, postInfo){
        
    }
    
    var exports = {};
    exports.displayPost = function(postInfo){
        var $postContainer;
        var $postContent;
        switch(postInfo.category){
            case 0: //song
                $postContainer = $("#base-song-container").clone().attr("id", "");
                $postContent = $postContainer.find(".post-content");
                updateSong($postContainer, $postContent, postInfo);
                break;
            case 1: //playlist
                $postContainer = $("#base-playlist-container").clone().attr("id", "");
                $postContent = $postContainer.find(".post-content");
                updatePlaylist($postContainer, $postContent, postInfo);
                break;
            default:
                break;
        }
    }
    return exports;
})($);