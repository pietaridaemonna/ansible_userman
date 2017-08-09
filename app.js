var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*
ROUTES
*/
var index = require('./routes/index');
var teams = require('./routes/teams');
var servers = require('./routes/servers');
var users = require('./routes/users');
var logout = require('./routes/logout');
var create_struct = require('./routes/create_struct');
var export_git = require('./routes/export_git');
var export_down = require('./routes/export_down');


var compression = require('compression');
var helmet = require('helmet');

var app = express();
app.use(compression());

//Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());
app.disable('x-powered-by');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('sdlkjf@JLRK#J#$kdfj', {resave: false, autosave: true, secure: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    res.header("Content-Security-Policy", "default-src 'self';script-src 'self';object-src 'none';img-src 'self';media-src 'self';frame-src 'none';font-src 'self' data:;connect-src 'self';style-src 'self'");
    next();
});

/*
VIEWS
 */
app.use('/', index);
app.use('/teams', teams);
app.use('/servers', servers);
app.use('/users', users);
app.use('/logout', logout);
app.use('/create_struct', create_struct);
app.use('/export_git', export_git);
app.use('/export_down', export_down);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
