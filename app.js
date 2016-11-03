var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');

var flash = require('connect-flash');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var validator = require('express-validator');
var connection = require('./config/database');

var index = require('./routes/index');
var users = require('./routes/users');


var dashboard = require('./routes/dashboard');

//var io = require('./bin/www').io;

var app = express();

app.io = require('socket.io')();





//connecting with the database

mongoose.connect(connection.dbURI);

require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


//Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

/*
* Setting session Middleware as variable for Sockt.IO
* */
var sessionMiddleware =session({
    secret:connection.sessionSecret,
    resave: false,
    saveUninitialized: true,
    httpOnly: true,
    // cookie: {secure: true}
});

app.io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(sessionMiddleware);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(validator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

//exporting passport


require('./routes/signup')(app, passport);




//app.use('/', routes);
app.use('/', index);
app.use('/users', users);
//app.use('/login', login);

app.use('/dashboard', dashboard);

app.get('/socket', function (req,res) {
    res.render('socket' ,{message : 'Socket app'});


})



/*
 * Socket IO
 * */


app.io.on('connection',function (socket) {
    console.log(socket.request.sessionID);
    console.log(socket.request.sessionStore);
    console.log(socket.handshake.sessionID);

    socket.on('chat message', function (msg) {
        app.io.emit('chat message', msg);
    });


});











// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'developme nt') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('404', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
