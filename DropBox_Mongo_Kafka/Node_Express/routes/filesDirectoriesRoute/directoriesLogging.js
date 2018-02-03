var mongo = require('./../database/mongo');
var userprofile = require('./../utils/userProfile');
var fileutils = require('./../utils/file-operantions');

const CREATED = 0,
    UPDATED = 1,
    DELETED = 2,
    SHARED = 3;

var createDirectoryEntry = function(filepath,userid,isFile,parentdir,name,parentPath,callback){
    var timestamp = new Date();
    // console.log(filepath);
    // console.log(parentdir);
    console.log(name);
    //console.log(parentPath);
    var data={
        "parentPath":parentPath,
        "name":name,
        "relative_path":filepath,
        "parent":parentdir+'',
        "createdby":userid+'',
        "isFile":isFile,
        "createdAt": timestamp
    };
    console.log("parentDir " + parentdir);
    console.log(JSON.stringify(data));
    mongo.insertDoc("directory",data,function(err, data) {
        if(err){
            throw err;
        }
        console.log('insert in directory login');
        logOperation({'path':filepath,'directoryid':data["ops"][0]["_id"]+'','operation':CREATED,'uid':userid,'performedAt':timestamp,'name':name},callback);
    });
};

var deleteDirEntry = function(filepath,userid,callback){
    var condition = {'relative_path':filepath};
    console.log(JSON.stringify(condition));
    var _data = {}
    getDeletedDirectoryId(filepath,function (err, results) {
        mongo.removeDoc("directory",condition,function(err,data){
            if(err){
                throw err;
            }
            logOperation({'path':filepath,'directoryid':results.id,'operation':DELETED,'uid':userid,'performedAt':new Date(),'name':results.name},callback);
        });
    });
};

var getDeletedDirectoryId = function(filepath,callback){
    console.log("filepath " + filepath);
    if(filepath===fileutils.GLOBAL_FILE_PATH || filepath===''){
        callback(false, 1);
    }
    var condition = {'relative_path' : filepath};
    console.log(JSON.stringify(condition));
    mongo.findOneDoc("directory",condition,function(err,data){
        console.log(data);
        var retData ={id:(data._id+''),name:data.name};
        console.log(retData.id);
        callback(err, retData);
    });
};

var getDirectoryId = function(filepath,callback){
    console.log("filepath " + filepath);
    if(filepath===fileutils.GLOBAL_FILE_PATH || filepath===''){
        callback(false, 1);
    }
    var condition = {'relative_path' : filepath};
    console.log(JSON.stringify(condition));
    mongo.findOneDoc("directory",condition,function(err,data){
        var retData = {};
        if(data) {
            console.log(data);
            retData = {id: (data._id + ''), name: data.name};
            console.log(retData.id);
        }
        callback(err, retData);
    });
};


var getOperation = function(operation){
    if(operation == CREATED){
        return "Created";
    }else if(operation == UPDATED){
        return "Updated";
    }else if(operation == DELETED){
        return "Deleted";
    }else if(operation == SHARED){
        return "Shared";
    }
};

var logOperation = function(datajson,callback) {
    var data = {
        path:datajson.path,
        directoryid:datajson.directoryid,
        operation: datajson.operation,
        userid:datajson.uid,
        performedAt:datajson.performedAt,
        name:datajson.name
    };
    mongo.insertDoc("directory_logging",data,function(err, results) {
        callback(err, results);
    });
};

var getUserLoggings = function(req,res){
    getAllFileOperationsForUser(req.body.userid, function (err,logs) {
        res.status(201).json({status:'201',logs:logs});
    });
};

var getAllFileOperationsForUser = function(userid,callback){
    var query ={userid:userid} ;
    mongo.findDoc("directory_logging",query,function(err,results){
        if (err) {
            console.log(err);
        }else {
            var length = results.length;
            var result = {};
            output = [];
            var temp = {};
            while (length > 0) {
                    result = results[--length];
                    if (userid == result.path) {
                        continue;
                    }
                    console.log(JSON.stringify(result));
                    var path = (result.path).split('/');
                    result.path = "home";
                    for (var i = 1; i < path.length; i++) {
                        result.path += "/" + path[i];
                    }
                    console.log(result.operation);
                    result.operation = getOperation(result.operation);
                    result.operationtime = userprofile.gtDateStringFromObject(result.performedAt, "MMDDYYYY", '/');
                    result.name = result.name;
                    output.push(result);
                }
            }
            callback(err,output);
        });
};

exports.logOperation = logOperation;
exports.getUserLoggings = getUserLoggings;
exports.createDirectoryEntry = createDirectoryEntry;
exports.getDirectoryId = getDirectoryId;
exports.deleteDirEntry = deleteDirEntry;