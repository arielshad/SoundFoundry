module.exports = (function(){
    var pg = require("pg");
    var process = require("process");
    var pool = null;
    var config = {
        user: "ubuntu",
        database: "ubuntu",
        port: 5432,
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
    };
    
    return (function(){
        if(!pool){
            pool = new pg.Pool(config);
        }
        return pool;
    });
})();