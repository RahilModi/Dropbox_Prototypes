var express = require('express');
var router = express.Router();
var mysql = require('./Database/mysql');

router.get('/:user', function(req, res, next){
    //var username = req.body.emailId;
    var username = req.params.user;
    var getUserQuery = `SELECT * FROM Users WHERE EmailId = '${username}';`;
    console.log(`Get User query is ${getUserQuery}`);

    mysql.fetchData(getUserQuery, function(err, results){
        if(err)
            throw err;
        else{
            if(results.length > 0) {
                console.log('Valid user loggedin');
                res.status(201).json({
                    UserId: results[0].UserId,
                    FirstName: results[0].FirstName,
                    LastName: results[0].LastName,
                    EmailId: results[0].EmailId,
                    Password: results[0].Password,
                    Work: results[0].Work,
                    Education: results[0].Education,
                    Contact: results[0].Contact,
                    Interests: results[0].Interests
                });
            }else{
                console.log("Invalid Login...")
                res.status(401).json({message:"Invalid credentials.."});
            }
        }
    });
});


router.post('/updateUser/:userId', function (req, res, next) {

    var userId = req.params.userId;
    var reqUserEmail = req.body.EmailId;
    var reqUserFname = req.body.FirstName;
    var reqUserLname = req.body.LastName;
    var reqUserWork = req.body.Work;
    var reqUserEducation = req.body.Education;
    var reqUserContact = req.body.Contact;
    var reqUserInterests = req.body.Interests;


    var updateUserQuery = `UPDATE Users SET FirstName='${reqUserFname}', LastName='${reqUserLname}', Work='${reqUserWork}', Education='${reqUserEducation}', Contact='${reqUserContact}', Interests='${reqUserInterests}' WHERE UserId = ${userId}`;

    console.log("query is :" +updateUserQuery);
    mysql.fetchData(updateUserQuery,function(err, result){
        if(err){
            throw err;
        }
        else{
            console.log('valid user');
            res.status(200).json({ Message : "User details has been updated successfully"});
        }
    });
});

module.exports = router;
