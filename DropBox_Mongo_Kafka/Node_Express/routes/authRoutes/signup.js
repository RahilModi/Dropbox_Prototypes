var ejs = require("ejs");
var mysql = require('./../database/mysql');
var mongo = require('./../database/mongo');
var login = require('./login');
var authentication = require('../../services/authentication');
var fileUtils = require('./../utils/file-operantions');
var dirlog = require('./../filesDirectoriesRoute/directoriesLogging');
var userprofile = require('./../utils/userProfile');

var afterSignUp = function(req,res){
    var username = {
        "emailid": req.body.email
    };
    mongo.findOneDoc("user", username, function(err,resp){
        console.log(resp);
        if(err){
            res.status(401).json({
                status:'401',
                message : "Error occurred while signing up."
            });
        }else if(resp){
            res.status(403).json({
                status:'403',
                message:'Email is already registered'
            });
        }else {
            var data = {
                "ufname": req.body.firstname,
                "ulname": req.body.lastname,
                "emailid": req.body.email,
                "username": req.body.email,
                "password": authentication.encrypt(req.body.password),
                "homedir": "",
                "profile": {
                    work: '', sports: '', mobile: '', education: ''
                }
            };

            mongo.insertDoc("user", data, function (err, result) {
                if (result) {
                    var searchId = result["ops"][0]["_id"];
                    var path = result["ops"][0]["_id"] + '';
                    data = {
                        $set:
                            {
                                homedir: path,
                                userid: path
                            }
                    };
                    console.log(path);
                    fileUtils.createDirectory(path, function (err, path) {
                        mongo.update("user", {_id: searchId}, data, function (err, data) {
                            if (!err) {
                                dirlog.createDirectoryEntry(path, path, 0, 1, path, "", function (err, data1) {
                                    res.status(201).json({
                                        status: '201',
                                        message: "User signed up successfully..."
                                    });
                                })
                            } else {
                                console.log(err);
                                res.status(401).json({
                                    status: '401',
                                    message: "Error occurred while signing up."
                                });
                            }
                        });
                    });
                } else {
                    res.status(401).json({
                        status: '401',
                        message: "Error occurred while signing up."
                    });
                }
            });
        }
    });
};
exports.afterSignUp = afterSignUp;