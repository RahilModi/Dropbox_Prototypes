var MongoClient = require('mongodb').MongoClient;
const dbName = 'dropbox';
var pool = require('./connectionPooling');

pool.createpool(100,function(){});

var connect = function(callback){
    console.log('check');
    pool.getConnection(callback);
};

var collection = function(name){
    if (connected) {
        throw new Error('Must connect to Mongo before calling "collection"');
    }
    return db.collection(name);
};


exports.findOneDoc = function(collectionname,conditionjson,callback){
    connect(function (client) {
        var _db = client.db(dbName);
        var coll = _db.collection(collectionname);
        coll.findOne(conditionjson, function(err, data){
            pool.closeConnection(client);
            callback(err,data);
        });
    });
};

exports.findDoc = function(collectionname,conditionjson,callback){
    connect(function (client) {
        var _db = client.db(dbName);
        var coll = _db.collection(collectionname);
        var cursor = coll.find(conditionjson);
        var data = [];
        cursor.forEach(function(doc) {
            data.push(doc);
        }, function(err) {
            pool.closeConnection(client);
            callback(false,data);
        });
    });
};

exports.insertDoc = function(collectionname,insertdata,callback){
    connect(function (client) {
        var _db = client.db(dbName);
        var coll = _db.collection(collectionname);
        coll.insertOne(insertdata, function(err, data){
            pool.closeConnection(client);
            callback(err,data);
        });
    });
};

exports.update = function(collectionname,query,insertdata,callback){
    connect(function (client) {
        var _db = client.db(dbName);
        var coll = _db.collection(collectionname);

        coll.update(query,insertdata, function(err, data){
            pool.closeConnection(client);
            callback(err,data);
        });
    });
};

exports.removeDoc = function(collection_name, query, callback){
    connect(function(client){
        var _db = client.db(dbName);
        var coll = _db.collection(collection_name);
        coll.remove(query, function(err,data){
            pool.closeConnection(client);
            callback(err,data);
        })
    })
};