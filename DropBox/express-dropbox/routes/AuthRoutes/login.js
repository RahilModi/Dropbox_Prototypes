var express = require('express');
var router = express.Router();
var mysql = require('../Database/mysql');
var CryptoJS = require('crypto-js');
var keys = require('../../config/key');

router.get('/doLogIn',function(req,res,next){
    res.send({
        status: 200,
        msg:'Hello Hi..'
    });
});

router.post('/doLogIn',function(req, res, next){
    var bytes = CryptoJS.AES.decrypt(req.body.encryptedPassword.toString(), keys.CRYPTO_SECRET_KEY);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);

    var username = req.body.emailId;
    var password = plaintext;
    console.log(username);
    console.log(password);
    var getUserQuery = `SELECT * FROM Users WHERE EmailID =  '${username}' AND Password = '${password}';`;
    console.log(`Query is ${getUserQuery}`);

    mysql.fetchData(getUserQuery, function(err, result){
        if(err){
            throw err;
        }
        else{
            if(result.length>0){
                console.log('Valid Login');
                res.status(201).json({message: "Login Succcessful"});
            }
            else
            {
                console.log("Invalid Login");
                res.status(401).json({message: "Login failed"})
            }
        }
    });

});

module.exports = router;