$(document).ready(function(){
    $(".modal-overlay").hide().removeClass("hidden");
    $("#btn-play").click(togglePlay); 
    $("#login-btn").click(openLoginWindow);
    $("#register-btn").click(openRegisterWindow);
    $("#continue-btn").click(submitAuth);
});

function openLoginWindow(){
    $(".modal-overlay").fadeIn(300, function(){
        $(".modal-window").click(function(e){
            return false;
        });
        $(this).click(function(){
            closeLoginWindow();
        });
    });
    $("#username-group").addClass("hidden");
}
function closeLoginWindow(){
    $("#errors").empty();
    $(".modal-overlay").fadeOut(300);
    $("#email-input").val("");
    $("#username-input").val("");
    $("#password-input").val("");
}
function openRegisterWindow(){
    $("#username-group").removeClass("hidden");
    $(".modal-overlay").fadeIn(300, function(){
        $(".modal-window").click(function(e){
            return false;
        });
        $(this).click(function(){
            closeLoginWindow();
        });
    });
}

function submitAuth(){
    App.submitAuth({
        email: $("#email-input").val(),
        username: $("#username-input").val(),
        password: $("#password-input").val()
    }, function(successData){
        closeLoginWindow();
        $("#login-btn").hide();
        $("#register-btn").hide();
        $("#profile-btn").removeClass("hidden");
    }, function(failData){
        failData.errors.forEach(function(e){
            $("<div></div>", {
                "class": "alert alert-danger",
                "html": e.msg
            }).appendTo("#errors");
        });
    });
}
