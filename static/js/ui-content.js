//
//ui-content.js
//

var uiContent = (function($){
    
    function updateSong($postContainer, $postContent, postInfo){
        $postContainer.find(".post-title").text(postInfo.post.title);
        $postContainer.find(".post-author").text(postInfo.post.username);
        $postContent.find(".post-play-btn").click(function(){
            var isPlaying = postInfo.clickedPlay();
            $(".post-pause-btn").removeClass(".post-pause-btn").find("span").removeClass("glyphicon-pause").addClass("glyphicon-play");
            if(isPlaying){
                $(this).addClass("post-pause-btn").find("span").removeClass("glyphicon-play").addClass("glyphicon-pause");
            }
        });
    }
    function updatePlaylist($postContainer, $postContent, postInfo){
        
    }
    
    var exports = {};
    exports.appendPost = function(postInfo){
        var $postContainer;
        var $postContent;
        switch(postInfo.post.category){
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
        $("<li>", {
            "class": "infinite-list-item"
        }).appendTo($(".infinite-list")).append($postContainer);
    }
    exports.displayPostList = function(){
        $(".infinite-list").show();
    }
    return exports;
})($);