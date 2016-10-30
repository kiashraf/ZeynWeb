/**
 * Created by user on 24-07-2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {
    res.render('dashboard', {title: 'Dashboard', user: req.user ,
        message : req.flash('alreadyLoggedIn')});

});


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
module.exports = router;