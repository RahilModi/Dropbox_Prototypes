var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var kafka = require('./../kafka/client');
var fileUtils = require('./../utils/file-operantions');

var afterSignUp = function(req,res) {

    var data = {
        "ufname": req.body.firstname,
        "ulname": req.body.lastname,
        "emailid": req.body.email,
        "username": req.body.email,
        "password": req.body.password,
        "homedir": "",
        "profile": {
            work: '', sports: '', mobile: '', education: ''
        }
    };

    kafka.make_request('signup_topic',data, function(err,results){
        console.log('in result ' + results );
        if(err){
            done(err,{});
        }
        else
        {
            if(results.status == '201'){
                res.status(201).json(results);
            } else {
                res.status(401).json(results);
            }
        }
    });
};

exports.afterSignUp = afterSignUp;