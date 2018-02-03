
var mongo = require('./../database/mongo');
var fileUtils = require('./../utils/file-operantions');
var dirlog = require('./../filesDirectoriesRoute/directoriesLogging');

var setStaredDir = function(req,res) {
    dirlog.getDirectoryId(req.body.filepath,function(err, results){
        var data = {
            "path":req.body.filepath,
            "userid":req.session.user.userid,
            "directoryid":results.id
        };
        mongo.insertDoc("staredDir",data,function(err, results) {
            if (err) {
                res.status(401).json({status:'401'});
            } else {
                res.status(201).json({status:'201'});
            }
        });
    });
};

var isDirStared = function(filepath,userid) {
    var query = [{"path":filepath},{"userid":userid}];
    query = {$and:query};
    mongo.findOneDoc("staredDir",query,function(err, result) {
        if (err) {
            return( false);
        } else {
            if(result)
                return(result.path);
            else
                return false;
        }
    });
};

var UnStarDir = function(req,res) {
    console.log(JSON.stringify(req.body));
    var query = [{"path":req.body.filepath},{"userid":req.session.user.userid}];
    query = {$and:query};
    mongo.removeDoc("staredDir",query,function(err,data){
        if (err) {
            res.status(401).json({status:'401'});
        } else {
            res.status(201).json({status:'201'});
        }
    })

};



var getAllStaredDirectories = function(userid,callback){
    var query = {"userid":userid};
    console.log(query);
    mongo.findDoc("staredDir",query,function(err,data) {
        var length =  data.length;
        query = [];
        while(length>0){
            var result = {};
            result = data[--length];
            result = {relative_path:result.path};
            query.push(result);
        }
        query = {$or : query};
        mongo.findDoc("directory",query,function(err,directories){

            if(!err){
                var output = [];
                var length = directories.length;

                while(length-->0){
                    var fileDetails ={};

                    fileDetails.name = directories[length].name;
                    fileDetails.relative_path = directories[length].relative_path;
                    fileDetails.fullPath =fileUtils.GLOBAL_FILE_PATH +"/"+fileDetails.relative_path;
                    fileDetails.isFile = directories[length].isFile;
                    output.push(fileDetails);
                }
                console.log(JSON.stringify(output));
                callback(false,output);
            }else{
                callback(err,results);
            }

        })
    });
};

exports.setStaredDir = setStaredDir;
exports.UnStarDir = UnStarDir;
exports.getAllStaredDirectories = getAllStaredDirectories;
exports.isDirStared = isDirStared;