var fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
    zipFolder = require('zip-folder'),
    mkdirp = require('mkdirp'),
    dirlog = require('./../filesDirectoriesRoute/directoriesLogging');

var fileLocation = '';

const GLOBAL_FILE_PATH = "./uploads";
const GLOBAL_TEMP_PATH = "./uploads/temp";

var createDirectory = function(filepath,callback){
    // mkdirp(GLOBAL_FILE_PATH+'/'+filepath, function (err) {
    //     if (err)  {callback(err,filepath);}
    //     else  {callback(err,filepath);}
    // });
    var new_Directory_Path = GLOBAL_FILE_PATH+'/'+filepath;
    console.log("New Directory Created at: " +new_Directory_Path);
    if(!fs.existsSync(new_Directory_Path))
        fs.mkdirSync(new_Directory_Path);
    callback(false,filepath);
};

var deleteFolderRecursive = function(path,userid) {
    var filepath =  path.replace(new RegExp(GLOBAL_FILE_PATH+'/', 'g'), '');
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath,userid);
            } else { // delete file
                dirlog.deleteDirEntry(curPath.replace(new RegExp(GLOBAL_FILE_PATH+'/', 'g'), ''),userid,function(){});
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
        dirlog.deleteDirEntry(filepath,userid,function(){});
    }
};

var deleteDir = function(filepath,userid,callback){
    console.log(filepath);
    if(fs.statSync(GLOBAL_FILE_PATH+'/'+filepath).isDirectory()){
        console.log('inside directory');
        deleteFolderRecursive(GLOBAL_FILE_PATH+'/'+filepath,userid);
    }else{
        console.log('inside not directory block');
        dirlog.deleteDirEntry(filepath,userid,function(){});
        fs.unlinkSync(GLOBAL_FILE_PATH + '/' + filepath);
    }
    callback(false,filepath);
};

var delDir = function(req,res,next){
    try {
        var path = req.body.dirName;
        var parent = req.body.path;
        var filepath = parent + "/" + path;
        console.log(filepath);
        deleteDir(filepath, req.session.user.userid, function () {
            res.status(201).json({
                message: 'Successfully deleted File'
            });
        });
    }catch (e){
        res.status(201).json({
            message: 'Successfully deleted File'
        });
    }
};

var checkFileIsFolder = function (filename){
    try{
        var stats = fs.statSync(filename);
        return !stats.isFile();
    }catch(e){
        console.log(e);
    }
    return false;
};

var checkFileIsFolder1 = function (filename,callback){
    try{
        var stats = fs.statSync(filename);
        callback(!stats.isFile());
    }catch(e){
        console.log(e);
    }
    return false;
};

var mkdir = function (req, res) {
    var folderName = req.body.dirName;
    var parent = req.body.path;
    createDirectory(parent+'/'+folderName,function(){
        dirlog.getDirectoryId(parent,function (err,results) {
            dirlog.createDirectoryEntry(parent+'/'+folderName, req.session.user.userid, 0, results.id, folderName,parent,function(err,data){
                res.status(201).json({
                    message: 'Successfully created Directory'
                });
            });
        });
    });
};

var download = function(req, res){
    var reqFilePath = GLOBAL_FILE_PATH + '/'+req.body.path;
    var reqFileName = path.basename(reqFilePath);

    console.log("---------------------");
    console.log(reqFilePath);
    console.log(reqFileName);
    fileLocation = reqFilePath;

    res.setHeader('Content-disposition', 'attachment; filename=' + reqFileName);
    // res.setHeader('Content-type', mimetype);
    res.download(fileLocation);

};

var ZipFile = function(from,to,callback){
    zipFolder(from, to, function(err) {
        if(err) {

        } else {

        }
    });
};

exports.GLOBAL_TEMP_PATH = GLOBAL_TEMP_PATH;
exports.GLOBAL_FILE_PATH = GLOBAL_FILE_PATH;
exports.createDirectory = createDirectory;
exports.checkFileIsFolder = checkFileIsFolder;
exports.checkFileIsFolder1 = checkFileIsFolder1;
exports.mkdir = mkdir;
exports.delDir = delDir;
exports.download = download;