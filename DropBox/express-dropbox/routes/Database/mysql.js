const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit : 500,
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'dropbox_db',
    port : 3306,
    debug : false
});

var fetchData = function(sqlQuery, callback){
    pool.getConnection(function(err,connection){
        connection.query(sqlQuery, function(err,rows,fields){
            if(err) {
                console.log("Error: " + err.message);
            }else {
                console.log("Results:" + rows);
            }
            callback(err,rows);
        });
        connection.release();
    });
    };

exports.fetchData = fetchData;