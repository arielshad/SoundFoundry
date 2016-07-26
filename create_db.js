//
//create the database with postgres if it does not exist, otherwise print all users and songs
//
//Note: we assume PGPASSWORD, PGUSER, PGDATABASE have already been set in the environment

var pg = require("pg");
var connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/ubuntu";

const createUsersQuery = 
    "CREATE TABLE users("
    + "id SERIAL PRIMARY KEY"
    + ", username TEXT NOT NULL"
    + ", email TEXT"
    + ", passhash TEXT"
    + ", timestamp INTEGER NOT NULL"
    + ")";

const createPostablesQuery =
    "CREATE TABLE postables("
    + "id SERIAL PRIMARY KEY"
    + ", userid INTEGER REFERENCES users (id)"
    + ", title TEXT NOT NULL"
    + ", category INTEGER NOT NULL" //0 for song, 1 for playlist - performance reasons
    + ", timestamp INTEGER NOT NULL"
    + ")";
    
const createPostsQuery = 
    "CREATE TABLE posts("
    + "id SERIAL PRIMARY KEY"
    + ", userid INTEGER REFERENCES users (id)"
    + ", postableid INTEGER REFERENCES postables (id)"
    + ", timestamp INTEGER NOT NULL"
    + ")";
    
const createSongsQuery = 
    "CREATE TABLE songs("
    + "postableid INTEGER REFERENCES postables (id)"
    + ", fileurl TEXT"
    + ")";

const createLikesQuery = 
    "CREATE TABLE likes("
    + "postableid INTEGER REFERENCES postables (id)"
    + ", userid INTEGER REFERENCES users (id)"
    + ", timestamp INTEGER NOT NULL"
    + ")";
    
const createCommentsQuery = 
    "CREATE TABLE comments("
    + "id SERIAL PRIMARY KEY"
    + ", postableid INTEGER REFERENCES postables (id)"
    + ", userid INTEGER REFERENCES users (id)"
    + ", body TEXT"
    + ", timestamp INTEGER NOT NULL"
    + ")";

var client = new pg.Client(connectionString);
client.connect(function(err) {
    if(err) throw err;
    var remaining = 6;
    
    var checkDone = function(err, result) {
        if(err) throw err;
        remaining--;
        if(!remaining){
            client.end(function(error) {
                if(error) throw error;
            });
        }
    }
    
    //execute table creation queries
    client.query(createUsersQuery, checkDone);
    client.query(createPostablesQuery, checkDone);
    client.query(createPostsQuery, checkDone);
    client.query(createSongsQuery, checkDone);
    client.query(createLikesQuery, checkDone);
    client.query(createCommentsQuery, checkDone);
});
