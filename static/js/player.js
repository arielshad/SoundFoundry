var audioPlayer = (function() {
    var audioEl;
    var isPlaying = false;
    
    if(window.HTMLAudioElement && typeof Audio != "undefined"){
        audioEl = new Audio;
        audioEl.src = "/media/XQNocZa7cMtzUHVT.mp3";
        audioEl.load();
    }
    
    return {
      play: function(){
          if(audioEl){
            audioEl.play();
            isPlaying = true;
          }
      },
      pause: function(){
          if(audioEl){
            audioEl.pause();
            isPlaying = false;
          }
      },
      isPlaying: function(){
          return isPlaying;
      },
      load: function(src){
          if(isPlaying){
            audioEl.pause();
          }
          audioEl.src = src;
          audioEl.load();
      }
    };
})();

function togglePlay(){
    if(audioPlayer.isPlaying()){
        audioPlayer.pause();
        $("#btn-play").find("span").removeClass("glyphicon-pause").addClass("glyphicon-play");
    }
    else{
        audioPlayer.play();
        $("#btn-play").find("span").removeClass("glyphicon-play").addClass("glyphicon-pause");
    }
}