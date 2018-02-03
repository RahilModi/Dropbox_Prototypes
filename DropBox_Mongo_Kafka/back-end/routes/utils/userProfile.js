//gender constants
var MALE = 1;
var FEMALE = 2;
var OTHER = 0;
//End
var kafka = require('./../kafka/client');

var gtDateStringFromObject = function(dateObj,format,separator){
    var date = new Date(dateObj);
    if(!separator){
        separator = "/";
    }
    if(format==="MMDDYYYY"){
        return (date.getMonth()+1)+separator+date.getDate()+separator+date.getFullYear();
    }else if(format==="YYYYMMDD"){
        return date.getFullYear()+separator+date.getMonth()+separator+date.getDate();
    }

};


var updateUserProfileDataReq = function(req,res){
    var dataJSON = {
        'type':'set',
        'userid':req.session.user.userid,
        'work': req.body.work,
        'sports' : req.body.sports,
        'mobile':req.body.mobile,
        'education':req.body.education
    };

    kafka.make_request('user_profile_topic',dataJSON, function(err,results){
        console.log('in result mkdir '+results);
        if(err){
            done(err,{});
        }
        else
        {
            if( results.status == '201'){
                res.status(201).json(results);
            }
            else {
                res.status(401).json(results);
            }
        }
    });
};

var getuserlogs = function(req,res){
    var data = {
        userid:req.session.user.userid,
        type:"getLogs"
    };
    kafka.make_request('user_profile_topic',data, function(err,results){
        console.log('in result get user logs '+results);
        if(err){
            done(err,{});
        }
        else
        {
            if( results.status == '201'){
                res.status(201).json(results);
            }
            else {
                res.status(401).json(results);
            }
        }
    });

};


var getUserProfileDataReq = function(req,res){
    var userid = '';
    if(req.session.user){
        userid = req.session.user.userid;
    }else{
        userid = req.body.userid;
    }
    var data = {
        userid:userid,
        type:"get"
    }
    kafka.make_request('user_profile_topic',data, function(err,results){
        console.log('in result mkdir '+results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.status == '201'){
                res.status(201).json(results);
            }
            else {
                res.status(401).json(results);
            }
        }
    });

};



var checkValidUserEmails = function(emails,callback){
    emails = emails.split(',');

    var query ={};
    if(emails.length==1){
        query = {emailid:emails[0]};
    }else{
        var length = emails.length;
        query = [];
        while(length>0){
            query.push({email:emails[--length]})
        }
        console.log("query : "+query);
        query = {$and:query};
    }
    console.log("query : "+JSON.stringify(query))
};

var getUserIDFromEmailAddress = function(email,callback){
    var query = {email:email};
};




exports.gtDateStringFromObject=gtDateStringFromObject;
exports.updateUserProfileDataReq = updateUserProfileDataReq;
exports.getUserProfileDataReq = getUserProfileDataReq;
exports.getuserlogs = getuserlogs;
exports.getUserIDFromEmailAddress = getUserIDFromEmailAddress;
exports.checkValidUserEmails = checkValidUserEmails;