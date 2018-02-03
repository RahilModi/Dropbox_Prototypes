var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');

var dirlog = require('./../fileoperations/directoriesLogging');
var files = require('./../utils/files');

var fs = require('fs');

var path = "";
var copy = function(from,to){
    fs.createReadStream(from).pipe(to);
};
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        files.createDirectory("temp",function(){});
        cb(null, files.GLOBAL_TEMP_PATH);
    },
    filename: function (req, file, cb) {
        path = file.originalname;
        cb(null, file.originalname);
    }
});

var upload = multer({storage:storage});

router.post('/uploadFile', upload.single('myFile'), function (req, res, next) {
    console.log(req.session)
    console.log(req.body.path);
    var stream = fs.createReadStream(files.GLOBAL_TEMP_PATH+'/'+path,{bufferSize: 64 * 1024});
    var des = fs.createWriteStream(files.GLOBAL_FILE_PATH+'/'+req.body.path+'/'+path);
    stream.pipe(des);

    var had_error = false;
    stream.on('error', function(err){
        had_error = true;
    });
    stream.on('close', function(){
        if (!had_error) fs.unlinkSync(files.GLOBAL_TEMP_PATH+'/'+path);
    });

    dirlog.getDirectoryId(req.body.path,function (err,results) {
        dirlog.createDirectoryEntry(req.body.path+'/'+path, req.session.user.userid, 1, results.id, path,req.body.path,function(){
            res.status(201).json({status:'201'});
        });
    });
});

module.exports = router;