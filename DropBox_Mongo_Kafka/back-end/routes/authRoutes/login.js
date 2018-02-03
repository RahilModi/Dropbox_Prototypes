//var userprofile = require('./../utils/userProfile');
var passport = require('passport');

// function renderUserResults(results){
//     var length = results.length;
//     while(length-->0){
//         results[length].gender = userprofile.getGender(results[length].gender);
//         results[length].dob = userprofile.gtDateStringFromObject(results[length].dob,"MMDDYYYY","/");
//     }
//     return results;
// }

var signin = function(req,res, next)
{
    passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).send();
        }
        if(user && user.loggedIn) {
            req.session.user =  user;
            console.log(req.session);
            return res.status(201).json({username:user.username,userid:user.userid,root:user.root,status:'201',message:user.message});
        }else{
            res.status(401).json({status:'401', message:user.message});
        }
    })(req, res,next);
};

var signout = function(req,res){
    console.log(req.session.user);
    req.session.user = null;
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(201).json({
        status:'201',
        message : "Successfully Signout..."
    });
};

exports.signin = signin;
exports.signout = signout;
