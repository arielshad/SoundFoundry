window.App = (function($){
    var exports = {};
    var config;
    
    function tryAuth(url, input, success, fail){
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
        console.log("initLoggedInUser data", data);
        config.userInfo = data;
        if(config.uiProfile){
            config.uiProfile.displayUserInfo(config.userInfo);
        }
    }
    function userLogout(){
        if(config.userInfo){
            $.post("/a/logout", config.userInfo, function(data){
                if(data["errors"]){
                    console.error("Could not logout user " + config.userInfo.email);
                }
                else{
                    //TODO: proper logout redirection
                    config.userInfo = null;
                    window.location = "/";
                }
            });
        }
        else{
            console.error("User tried logging out before being logged in");
        }
    }
    
    //public members-------------------------------
    //
    //Initializes UI elements with necessary data, logs in user with session ID
    //
    exports.initialize = function(initConfig){
        config = initConfig;
        console.log("init", config);
        if(config.userInfo){
            initLoggedInUser(config.userInfo);
        }
        if(config.uiProfile){
            config.uiProfile.initializeFunctions({
                logout: userLogout
            });
        }
        console.log("asaa", config);
        console.log(this);
    };
    exports.submitAuth = function(input, success, fail){
        console.log("Submitting auth...", config);
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
    exports.printConfig = function(){
        console.log(config);
    };
    exports.getConfig = function(){
        return config;
    }
    return exports;
})($);
