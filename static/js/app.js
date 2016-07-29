var App = (function($){
    var exports = {};
    var config;
    
    function tryAuth(url, input, success, fail){
        console.log(input);
        $.post(url, input, function(data){
            if(data["errors"]){
                fail(data);
            }
            else {
                success(data);
            }
        });
    }
    function initLoggedInUser(data){
        config.userInfo = data;
        console.log(config);
        if(config.uiProfile){
            config.uiProfile.displayUserInfo(config.userInfo);
        }
    }
    
    //public members-------------------------------
    //
    //Initializes UI elements with necessary data, logs in user with session ID
    //
    exports.initialize = function(initConfig){
        config = initConfig;
        console.log("init");
        if(config.userInfo){
            initLoggedInUser(config.userInfo);
        }
    };
    exports.submitAuth = function(input, success, fail){
        if(input.username){
            tryAuth("/a/register", input, function(data){
                success(data);
                initLoggedInUser(data);
            }, function(data){
                fail(data);
            });
        }
        else{
            tryAuth("/a/authenticate", input, function(data){
                success(data);
                initLoggedInUser(data);
            }, function(data){
                fail(data);
            });
        }
    };
    return exports;
})($);