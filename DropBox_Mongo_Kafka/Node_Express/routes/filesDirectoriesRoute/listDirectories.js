var fs = require('fs');
const util = require('util');
var testFolder = './routes/';
var fileUtils = require('./../utils/file-operantions');
var permission = require('./../filesDirectoriesRoute/permissions');
var star = require('./../user/starring');
var dirlog = require('./../filesDirectoriesRoute/directoriesLogging');
var mongo = require('./../database/mongo');

var checkFileIsFolder = function (filename){
    try{
        var stats = fs.statSync(filename);
        return !stats.isFile();
    }catch(ex){
        console.log(ex);
    }
    return false;
};

var getAllChildDirectories=function(root,userid,callback){
    dirlog.getDirectoryId(root,function(err,data){
        if(data.id!= undefined){
            console.log("data.id : "+data.id);
            var query ={"parent":data.id};

            console.log(JSON.stringify(query));
            mongo.findDoc("directory",query,function(err,result){
                console.log(JSON.stringify());
                if(!err){
                    callback(err,result);
                }else{
                    callback(err,[]);
                }
            });
        }
    })
};

var listdir = function (req,res)
{
    var root = req.body.dir;
    console.log(root);
    var sess= req.session;
    var userid = sess.user.userid;
    return getAllChildDirectories(root,userid,function(err,files){
        console.log("Files" + files);
        if(err){
            console.log(err);
        }else{
            star.getAllStaredDirectories(userid,function (err1,results1) {
                if(err1){
                    res.status(201).json({status:'201',fileLst:files,stared:[]});
                }else{
                    permission.getAllPermittedDirectories(userid,function(err,results2){
                        if(!err){
                            res.status(201).json({status:'201',fileLst:(files),stared:(results1),shared:(results2)});
                        }else{
                            res.status(201).json({status:'201',fileLst:(files),stared:(results1),shared:[]});
                        }
                    })
                }
            });
        }
    });
};

var includeStaredFlag = function(directoryList, staredlist){
    var length = directoryList.length;
};


/*
exports.DirectoryList = DirectoryList;*/
exports.getAllChildDirectories = getAllChildDirectories;
exports.listdir = listdir;
exports.checkFileIsFolder = checkFileIsFolder;