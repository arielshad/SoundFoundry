var App = (function(){
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
    
    //public members-------------------------------
    exports.initialize = function(initConfig){
        config = initConfig;
    }
    exports.submitAuth = function(input, success, fail){
        if(input.username){
            tryAuth("/a/register", input, success, fail);
        }
        else{
            tryAuth("/a/authenticate", input, success, fail);
        }
    }
    return exports;
})();