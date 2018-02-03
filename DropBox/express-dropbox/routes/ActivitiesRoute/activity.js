
var express = require('express');
var router = express.Router();
var mysql = require("../Database/mysql");

router.get('/:userId', function (req, res, next) {

    //var userId = Number(req.body.userId);
    var userId = Number(req.params.userId);
    console.log(`User activities : ${userId}`);
    getActivityQuery = `SELECT * FROM Activity WHERE UserId = ${userId} ORDER BY ActivityId DESC LIMIT 10`;
    console.log(`User Activites Query is : ${getActivityQuery}`);

    mysql.fetchData(getActivityQuery, function(err, result){
        if(err){
            throw err;
        }
        else{
            console.log('Activities retrieved successfully');
            res.status(201).json({ result});
        }
    });
});

module.exports = router;