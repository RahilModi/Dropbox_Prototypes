// Define authentication middleware BEFORE your routes
var requireLogin = function (req, res, next) {
    console.log(req.session);
    if (req.session.user || req.body.userid) {
        return next();
    }else{
        res.status(501).json({status:'501'});
    }
};

exports.requireLogin = requireLogin