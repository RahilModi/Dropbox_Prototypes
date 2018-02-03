var express = require('express');
var router = express.Router();
var mysql = require("./Database/mysql");
var fileLocation = "";
var fs = require('fs');

router.post('/getfiles', function (req, res, next) {

    //console.log(req);
    // var reqUserId = req.body.userDetail.UserId;
    var reqUserId = req.body.userId;
    var parentId = Number(req.body.parentId);
    var getUser='';

    console.log(parentId);
    if(parentId>0) {
        getFilesQuery = `SELECT * FROM Directory WHERE UserId = ${reqUserId} AND ParentId=${parentId}`;
    }else{
        getFilesQuery = `SELECT * FROM Directory WHERE UserId = ${reqUserId} AND ParentId IS NULL`;
    }
    console.log(`query is : ${getFilesQuery}`);

    mysql.fetchData(getFilesQuery, function(err, result){
        if(err){
            throw err;
        }
        else {
            console.log('Valid Login');
            res.status(201).json({result});
        }
    });
});


router.post('/updateFile', function (req, res, next) {

    var reqFileId = req.body.Id;
    var reqIsStarred = req.body.IsStarred;
    var updateFileQuery = "";


    if(reqIsStarred == 0){
        updateFileQuery = "UPDATE Directory SET IsStarred = 1 WHERE Id = '"+reqFileId+"'";
    }
    else{
        updateFileQuery = "UPDATE Directory SET IsStarred = 0 WHERE Id = '"+reqFileId+"'";
    }
    console.log("star is :" +reqIsStarred);
    console.log("query is :" +updateFileQuery);

    mysql.fetchData(updateFileQuery, function(err, result){
        if(err){
            throw err;
        }
        else{
            console.log('Valid Update');
            res.status(201).json({ message : "Update Successfull"});
        }
    });
});

router.post('/downloadFile', function (req, res, next) {

    var reqFileId = req.body.Id;
    var reqFileName = req.body.Name;
    var reqFilePath = req.body.Path;

    console.log("---------------------");
    console.log(reqFilePath);
    console.log(reqFileName);

    fileLocation = reqFilePath;
    res.download(fileLocation);
});

router.get('/downloadFile', function (req, res, next) {
    res.download(fileLocation);
});

router.post('/getshared', function (req, res, next) {
    var reqUserId = req.body.userId;
    var getSharedQuery='';

    getSharedQuery = `SELECT * FROM Directory WHERE Members IS NOT NULL`;

    console.log(`query is : ${getSharedQuery}`);

    mysql.fetchData(getSharedQuery, function(err, result){
        if(err){
            throw err;
        }
        else{
            console.log('Valid Login');
            var filelist = [];
            var members;
            for(var i=0; i<result.length; i++){
                members = result[i].Members;
                var arrMembers = members.split(",");
                if(arrMembers.indexOf(reqUserId)>=0){
                    filelist.push(result[i])
                }
            }
            console.log("======", filelist);
            res.status(201).json( {filelist});
        }
    });
});

router.post('/setSharing', function (req, res, next) {
    var fileitem = req.body.file;
    var fileId = fileitem.Id;
    var members= req.body.members;

    var getFileQuery = `SELECT * FROM Directory WHERE Id = '${fileId}'`;

    console.log(`query is : ${getFileQuery}`);

    mysql.fetchData(getFileQuery,function(err, result){
        if(err){
            throw err;
        }
        else{
            console.log('Valid Login');

            var currentMembers = result[0].Members;
            var newMembers = currentMembers + members +",";
            var updateSharing = `UPDATE Directory SET Members = '${newMembers}' WHERE Id = '${fileId}'`;

            console.log("query is :" +updateSharing);

            mysql.fetchData(updateSharing, function(err, result){
                if(err){
                    throw err;
                }
                else{
                    console.log('Valid Login');
                    res.status(200);
                }
            });
        }
    });
});

router.delete('/deleteFile/:fileId', function(req,res,next){
    var fileId = req.params.fileId;
    var filePath = `SELECT * from Directory WHERE Id=${fileId};`;
    console.log(filePath + " : Query");
    mysql.fetchData(filePath, function (err, result){
        if(err){
            throw err;
        } else{
            console.log('File deleted..');
            var path = result[0].Path;
            fs.unlinkSync(path);
            var deleteFileQuery = `DELETE FROM Directory WHERE Id=${fileId};`;
            console.log("query is: "+deleteFileQuery);
            mysql.fetchData(deleteFileQuery, function (err, resp){
                if(err){
                    throw err;
                }
            });
            res.status(200).json({message:"File has been deleted successfully..."});
        }
    })

});

module.exports = router;