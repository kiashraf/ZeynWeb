/**
 * Created by user on 23-07-2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Kya title dein' });

});

module.exports = router;
