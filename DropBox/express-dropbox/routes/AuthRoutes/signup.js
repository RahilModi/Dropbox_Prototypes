var express = require('express');
var router = express.Router();
var mysql = require("../Database/mysql")

router.post('/doSignUp', function (req, res, next) {

    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.emailid;
    var password = req.body.password;

    var addUserQuery = `INSERT INTO Users(FirstName, LastName, EmailId, Password) Values ('${firstName}','${lastName}','${email}','${password}');`;
    console.log(`Query is ${addUserQuery}`);

    mysql.fetchData(addUserQuery,function(err, result){
        if(err){
            throw err;
        }
        else{
            console.log('Valid SignUp');
            res.status(201).json({message: "SignUp successful"});
        }
    });
});

module.exports = router;