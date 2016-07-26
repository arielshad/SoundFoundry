$(document).ready(function(){
    $("#btn-play").click(togglePlay); 
    $("#login-btn").click(tryLogin);
    $("#signup-btn").click(tryRegister);
});

function tryLogin(){
    var username = $("#login-username").val();
    var password = $("#login-password").val();
}

function tryRegister(){
    var email = $("#signup-email").val();
    var username = $("#signup-username").val();
    var password = $("#signup-password").val();
    $.post("/a/register", {
        "email": email,
        "username": username,
        "password": password
    },function(data){
        data = JSON.parse(data);
        if(data["errors"]){
            data.errors.forEach(function(e){
                $("<div></div>", {
                    "class": "alert alert-danger",
                    "html": e.msg
                }).appendTo("#errors");
            });
        }
        else {
            window.location = "/";
        }
    });
}