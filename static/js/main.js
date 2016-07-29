$(document).ready(function(){
    $(".modal-overlay").hide().removeClass("hidden");
    $("#btn-play").click(togglePlay); 
    App.initialize({
       uiProfile: uiProfile 
    });
});


