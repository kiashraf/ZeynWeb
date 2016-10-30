/**
 * Created by user on 23-07-2016.
 */
var ContactUs = require('../models/contactUs');

module.exports = function (app, passport) {


    app.get('/signup', function (req, res) {
        res.render('signup', {
            title: 'ZeynDoc',
            message: req.flash('signupMessage'),
            errors : req.validationErrors(),
        });

    });

    app.post('/signup',

        function (req,res) {


            req.checkBody('name', 'Name is required').notEmpty();

            req.checkBody('mobile', 'Mobile Number not Valid').isMobilePhone('en-IN');
            req.checkBody('email', 'Email is required').notEmpty();
            req.checkBody('email', 'Email is not Valid').isEmail();
            req.checkBody('password', 'Password is required').notEmpty();
            req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

            var errors = req.validationErrors();

            if (errors) {
                res.render('signup', {
                    errors: errors,
                    title: 'ZeynDoc',
                    message: req.flash('signupMessage'),
                });
            }else {


                passport.authenticate('local-signup', {
                    successRedirect: '/dashboard',
                    failureRedirect: '/signup',
                    failureFlash: true
                })(req, res);
            }
        }



    );

    app.get('/login', function (req, res) {
        if (req.isAuthenticated()) {

            req.flash('alreadyLoggedIn' ,'You are already Logged In :) , Log Out to login from other account ');
            res.redirect('/dashboard');

        }else{

        res.render('login', {
            title: 'Login Page',
            message: req.flash('loginMessage')
        });

    }
    });


    app.post('/login', passport.authenticate('local-login', {

        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/contactUs', function (req, res) {

        var newContactUs = ContactUs();

        newContactUs.name = req.body.InputName;
        newContactUs.email = req.body.InputEmail;
        newContactUs.message = req.body.InputMessage;

        newContactUs.save(function (err) {
            if (err) {
                throw err;
            }

        });
        req.flash('ContactUsMessage', 'Thank You! We will contact you soon.');
        res.redirect('/');

    });


}
