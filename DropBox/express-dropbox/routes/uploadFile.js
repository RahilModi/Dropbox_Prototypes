var express = require('express');
//var axios = require('axios');
var multer = require('multer');
var mysql = require('./Database/mysql');
var router = express.Router();
const fs = require('fs');

var upload = multer({ dest: './files'});

router.post('/uploadFile', upload.any(), function (req, res, next) {

    const file = req.files[0];
    const meta = req.body;
    const reqUserId = req.body.userId;
    const reqParentId = Number(req.body.parentId);
    const reqFileName = req.body.name;
    console.log("PARENT ID ====" +reqParentId);

    var getPathQuery = `SELECT * FROM Directory WHERE Id ='${reqParentId}'`;
    var folderPath = "";
    var addFile = "";

    if(reqParentId > 0){
        mysql.fetchData(getPathQuery, function (err, result) {
            if (err) {
                throw err;
            } else {
                folderPath = result[0].Path;
                console.log("PATH =====" + folderPath);
                fs.renameSync(file.path, "./files/"+ folderPath + "/" + reqParentId+ "/"+file.filename);

                var location = "./files/"+ folderPath + "/" + reqParentId+ "/"+file.filename;
                addFileQuery = `INSERT INTO Directory(Name, Type, Members, IsStarred, UserId, ParentId, Path) Values ('${reqFileName}',0,'',0,${reqUserId},${reqParentId},'${location}');`;
                console.log(addFileQuery);
                mysql.fetchData(addFileQuery,function(err, result){
                    if(err){
                        throw err;
                    }
                    else{
                        console.log('Valid Upload');
                        var datenow = new Date();
                        addActivityQuery = `INSERT INTO Activity(Description, UserId, ActivityTime) Values ( 'Uploaded File "${reqFileName}"',${reqUserId},'${datenow}');`;
                        console.log("inner query : " + addActivityQuery);
                        mysql.fetchData(addActivityQuery, function (err, result) {
                            if (err) {
                                throw err;
                            } else {
                                console.log("Activity Added");
                            }
                        });
                    }
                });
                res.end();
            }
        });
    }
    else{
        if(!fs.existsSync('./files/'+reqUserId))
            fs.mkdirSync('./files/'+reqUserId);
        fs.renameSync(file.path, "./files/"+reqUserId+"/"+file.filename);

        var location = "./files/"+reqUserId+"/"+file.filename;
        addFileQuery = `INSERT INTO Directory(Name, Type, Members, IsStarred, UserId, Path) Values ('${reqFileName}',0,'',0,${reqUserId},'${location}');`;
        console.log(addFileQuery);
        mysql.fetchData(addFileQuery,function(err, result){
            if(err){
                throw err;
            }
            else{
                console.log('Valid Upload');
                var datenow = new Date();
                addActivityQuery = `INSERT INTO Activity(Description, UserId, ActivityTime) Values ( 'Uploaded File "${reqFileName}"',${reqUserId},'${datenow}');`;
                console.log("Activity query : " + addActivityQuery);
                mysql.fetchData(addActivityQuery, function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        console.log("Activity Added");
                    }
                });
            }
        });
        res.end();
    }
});

module.exports = router;