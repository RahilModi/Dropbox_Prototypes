const MongoClient = require('mongodb').MongoClient;
// Connection URL - with DB name
const url = require('../../config/keys').MONGO_URL;
var connected = false;
var client;
var db;

var connect = function (callback) {
    MongoClient.connect(url, {native_parser: true,poolSize: 30}, function (err, _client) {
        if (err) throw new Error('could not connect: ' + err);
        console.log("Connected successfully to server");
        client = _client;
        db = client.db('dropbox');
        connected = true;
        callback(db);
    });
};

var collection = function (collection_name) {
    if (!connected) throw new Error('First connect with the database...then try again..');
    return db.collection(collection_name);
};

exports.findOneDoc = function(collectionname,req,callback){
    connect(function () {
        var coll = collection(collectionname);
        coll.findOne(req, function(err, data){
            callback(err,data);
        });
    });
};

exports.findDoc = function(collectionname,req,callback){
    connect(function () {
        console.log(JSON.stringify(req));
        var coll = collection(collectionname);
        var cursor = coll.find(req);
        var data = [];
        cursor.forEach(function(doc) {
            console.log(JSON.stringify(doc));
            data.push(doc);
        }, function(err) {
            callback(false,data);
        });
    });
};


exports.insertDoc = function (collection_name, input, callback) {
    connect(function () {
        var coll = collection(collection_name);
        coll.insertOne(input, function (err, data) {
            callback(err, data);
        });
    });
};

exports.update = function (collection_name, query, input, callback) {
    connect(function () {
        var coll = collection(collection_name);
        coll.update(query, input, function (err, data) {
            callback(err, data);
        });
    })
};

exports.removeDoc = function(collection_name, query, callback){
    connect(function(){
        var coll = collection(collection_name);
        coll.remove(query, function(err,data){
            callback(err,data);
        })
    })
};
