var mongo = require('./../database/mongoDB');

var getAllUserGroups = function(callback){
    mongo.findDoc("usergroup",{},function (err,results) {
        var data = {status:201, groups : results};
        callback(err,data);
    })

};

var getBulkUserInfo = function(emailids,callback){
    var query  =  [];
    var length =  emailids.length;
    while(length>0){
        query.push({emailid:emailids[--length].email});
    }
    query = {$or : query};
    console.log("query : ",query);
    mongo.findDoc("user",query,callback);
};


var createUserGroup = function(groupname,userid,memberjson,id,callback) {

    getBulkUserInfo(memberjson,function(err,data){
        var data = {
            groupname : groupname,
            createdBy : userid,
            users:data,
            memberjson : memberjson,
            id:''
        };

        mongo.findOneDoc("usergroup",{groupname:groupname},function (err,result) {
            if(result && result.id){
                id = result.id;
            }

            if(id!= undefined && id.trim()!=''){
                data.id = id;
                mongo.update("usergroup",{id:id},data,function (err,results){
                    callback(err,{status:201});
                });
            }else{
                mongo.insertDoc("usergroup",data,function(err,results){
                    var id =  results["ops"][0]["_id"];
                    data = {$set: {id:(id+'')}};
                    var query = {_id:id};
                    mongo.update("usergroup",query,data,function(err,results){
                        callback(err,{status:201});
                    });
                });
            }
        });
    })
};

var getAllUserInGroup = function(groupid,callback){
    var query = {
        id : groupid
    };
    mongo.findOneDoc("usergroup",query,function(err,results){
        callback(err,results);
    })
};

exports.createUserGroup = createUserGroup;
exports.getAllUserInGroup = getAllUserInGroup;
exports.getAllUserGroups = getAllUserGroups;