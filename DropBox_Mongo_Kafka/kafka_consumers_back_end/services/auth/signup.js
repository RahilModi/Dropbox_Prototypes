var mongo = require('./../database/mongoDB');
var security = require('./../utils/authentication');
var fileUtils = require('./../utils/files');
var dirlog = require('./../fileoperations/directoriesLogging');
var userprofile = require('./../utils/userprofile');

var afterSignUp = function(data,callback) {
    if (false) {
        callback(null, {
            "status": 401
        });
    } else {
        mongo.findOneDoc("user",{ emailid:data.username}, function (err, resp) {
            console.log(resp);
            if (err) {
                callback(null, {
                    status: '401',
                    message: "Error occurred while Signup."
                });
            } else if (resp) {
                callback(null, {
                    status: '403',
                    message: "Already registered Email."
                });
            } else {
                console.log("data is :" + JSON.stringify(data));
                var d = {
                    "ufname": data.ufname,
                    "ulname": data.ulname,
                    "emailid": data.emailid,
                    "username": data.emailid,
                    "password": security.encrypt(data.password),
                    "homedir": "",
                    "profile": {
                        work: '', sports: '', mobile: '', education: ''
                    }
                };
                mongo.insertDoc("user", d, function (err, result) {
                    if (result) {
                        var searchId = result["ops"][0]["_id"];
                        var path = result["ops"][0]["_id"] + '';
                        data = {
                            $set: {
                                homedir: path,
                                userid: path
                            }
                        };

                        mongo.update("user", {_id: searchId}, data, function (err, data) {
                            if (!err) {
                                dirlog.createDirectoryEntry(path, path, 0, 1, path, "", function (err, data1) {
                                    fileUtils.createDirectory(path, function (err, path) {
                                    });
                                    callback(null, {
                                        status: '201',
                                        message: "Signup Successfull.",
                                        uid: path
                                    });
                                })
                            } else {
                                console.log(err);
                                callback(null, {
                                    status: '401',
                                    message: "Error occured while Signup."
                                });
                            }
                        });
                    } else {
                        callback(null, {
                            status: '401',
                            message: "Error occured while Signup."
                        });
                    }
                });
            }
        });
    }
};
exports.afterSignUp = afterSignUp;