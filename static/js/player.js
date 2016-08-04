var audioPlayer = (function() {
    var audioEl;
    var srcString = "";
    var isPlaying = false;
    
    if(window.HTMLAudioElement && typeof Audio != "undefined"){
        audioEl = new Audio;
        audioEl.src = "";
        audioEl.load();
    }
    
    return {
      play: function(){
          if(audioEl){
            console.log("played!");
            audioEl.play();
            isPlaying = true;
          }
      },
      pause: function(){
          if(audioEl){
            console.log("paused!");
            audioEl.pause();
            isPlaying = false;
          }
      },
      isPlaying: function(){
          return isPlaying;
      },
      load: function(src){
          if(audioEl){
            if(isPlaying){
              audioEl.pause();
            }
            audioEl.src = srcString = src;
            audioEl.load();
          }
      },
      togglePlay: function(src){
        if(isPlaying){
          if(srcString != src){
            this.load(src);
            return this.play();
          }
          return this.pause();
        }
        if(srcString != src){
          this.load(src);
        }
        this.play();
      }
    };
})();