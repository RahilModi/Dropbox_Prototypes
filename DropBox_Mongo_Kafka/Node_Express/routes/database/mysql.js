var ejs = require('ejs');
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password:'root',
    database:'dropbox',
    posrt:'3306',
    debug:false
});

exports.fetchData = function(callback, sqlQuery, data){
    console.log(sqlQuery);
    pool.getConnection(function (err, connection) {
        connection.query(sqlQuery,data,function (err, results) {
            if(err) console.log('ERROR: ' +  err.message);
            else callback(err, results);
            connection.release();
        });
    });
};

exports.storeData = function(callback, sqlQuery, data){
    console.log(sqlQuery);
    pool.getConnection(function (err, connection) {
        try {
            connection.query(sqlQuery, data, function (err, results) {
                if (err) console.log('ERROR: ' + err.message);
                callback(err, results);
            });
        }finally {
            connection.release();
        }
    });
};
