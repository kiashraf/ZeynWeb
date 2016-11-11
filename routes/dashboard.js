/**
 * Created by user on 24-07-2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {


    res.render('dashboard', {
        title: 'Dashboard', user: req.user,
        message: req.flash('alreadyLoggedIn'),
        appId: 'f303676dbaecc46f83e58e9dabc41d6b'

    });

});


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/signup');
}
module.exports = router;