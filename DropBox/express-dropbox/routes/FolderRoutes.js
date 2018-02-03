var express = require('express');
var router = express.Router();
var mysql = require("./Database/mysql");
const fs = require('fs');

router.post('/createFolder', function (req, res, next) {

    var reqUserId = req.body.userDetail.UserId;
    var parentId = Number(req.body.parentId);
    var reqFolderName = req.body.foldername;

    var getPathQuery = `SELECT * FROM Directory WHERE Id=${parentId};`;
    var folderpath = '';
    var newfolderpath = '';
    var addFolderQuery = '';
    console.log("GetPath: " + getPathQuery);

    if (parentId > 0) {
        mysql.fetchData(getPathQuery,function (err, result) {
            if (err) {
                throw err;
            } else {
                console.log("query : " + result);
                folderpath = result[0].Path;
                newfolderpath = folderpath + "/" + parentId;
                addFolderQuery = `INSERT INTO Directory(Name, Type, Members, IsStarred, UserId, ParentId, Path) Values ('${reqFolderName}',1,'',0,${reqUserId},${parentId},'${newfolderpath}');`;
                mysql.fetchData(addFolderQuery,function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        console.log('Valid folder');
                        fs.mkdirSync(`./files/${newfolderpath}/${result.insertId}`);
                        var datenow = new Date();
                        addActivityQuery = `INSERT INTO Activity(Description, UserId, ActivityTime) Values ( 'Created Folder ${reqFolderName} ',${reqUserId},'${datenow}');`;

                        console.log("inner query : " + addActivityQuery);
                        mysql.fetchData(addActivityQuery,function (err, result) {
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
    } else {
        newfolderpath = reqUserId;
        addFolderQuery = `INSERT INTO Directory(Name, Type, Members, IsStarred, UserId, Path) Values ('${reqFolderName}',1,'',0,${reqUserId},'${newfolderpath}');`;
        console.log("outer query : " + addFolderQuery);
        mysql.fetchData(addFolderQuery, function (err, result) {
            if (err) {
                throw err;
            } else {
                console.log('Valid folder');
                if(!fs.existsSync('./files/'+reqUserId))
                    fs.mkdirSync('./files/'+reqUserId);
                fs.mkdirSync(`./files/${reqUserId}/${result.insertId}`);

                var datenow = new Date();
                addActivityQuery = `INSERT INTO Activity(Description, UserId, ActivityTime) Values ( 'Created Folder ${reqFolderName} ',${reqUserId},'${datenow}');`;
                console.log("Add activity query : " + addActivityQuery);
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