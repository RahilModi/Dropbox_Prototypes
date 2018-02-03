var bcrypt = require('bcrypt');

exports.encrypt = function(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};

exports.compareEncrypted = function(password,hash){
    return bcrypt.compareSync(password, hash);
};

// Define authentication middleware BEFORE your routes
exports.requireLogin = function (req, res, next) {
    console.log(req.session);
    if (req.session.user) {
        return next();
    }else{
        res.redirect('/login');
    }
};