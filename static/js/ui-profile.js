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
        console.log("my app is definitely ", app, "the windows app is ", window.App);
        console.log("my app config", app.getConfig());
        console.log("windows app config", window.App.getConfig());
        console.log("my app is equal", app === window.App);
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
    app.printConfig();
    console.log("my app is equal", app === window.App);
    window.App["WHYWONTTHISBULLSHITWORK"] = {"ebebebe": "doodoo"};
    console.log("Tried changing window app, so now is", app === window.App);
    console.log("Even though myapp is ", app, "window.App is", window.App);
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
