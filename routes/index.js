var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , ContactUsMessage : req.flash('ContactUsMessage'),
  user : req.isAuthenticated()
  });

});

module.exports = router;
