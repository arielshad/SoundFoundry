//
//ui-profile.js
//

//init login/register button functions for those without profile
(function(app, $){
    
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
    function openLoginWindow(){
        openRegisterWindow();
        $("#username-group").addClass("hidden");
    }
    
    function submitAuth(){
        app.printConfig();
        app.submitAuth({
            email: $("#email-input").val(),
            username: $("#username-input").val(),
            password: $("#password-input").val()
        }, function(successData){
            closeLoginWindow();
        }, function(failData){
            failData.errors.forEach(function(e){
                $("<div></div>", {
                    "class": "alert alert-danger",
                    "html": e.msg
                }).appendTo("#errors");
            });
        });
    }
    
    $("#login-btn").click(openLoginWindow);
    $("#register-btn").click(openRegisterWindow);
    $("#continue-btn").click(submitAuth);
})(App, $);

var uiProfile = (function($){
   var exports = {};
   
   exports.displayUserInfo = function(userInfo){
       $(".profile-group").show();
       $("#login-btn").hide();
       $("#register-btn").hide();
       if(userInfo.username){
            $("#profile-username").text(userInfo.username);
       }
   };
   exports.initializeFunctions = function(btnFunctions){
       $("#logout-btn").click(function(){
           btnFunctions.logout();
       });
   };
   return exports;
})($);
