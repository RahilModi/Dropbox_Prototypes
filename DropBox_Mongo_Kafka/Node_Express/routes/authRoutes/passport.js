var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./../database/mongo");
var authentication = require('../../services/authentication');


module.exports = function() {
    passport.use('login', new LocalStrategy(function(username, password, done) {
        try {
            mongo.findOneDoc("user",{'username': username}, function(err, user){
                console.log(user);
                if (user) {
                    console.log(user.password);
                    console.log(password);
                    if(authentication.compareEncrypted(password,user.password)){
                        return done(null, {userid:user._id, username: username, password: password, root:user._id+'',loggedIn: true, message:'Welcome to dropbox..!!'});
                    }else{
                        return done(null, {loggedIn:false, message: "Incorrect password"});
                    }
                } else {
                    return done(null, {loggedIn:false, message: "Not registered"});
                }
            });
        }
        catch (e){
            console.log(e);
            return done(e,{});
        }
    }));
};