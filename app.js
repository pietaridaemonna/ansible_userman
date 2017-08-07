var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var GLOB = require('./routes/globals');
GLOB.push({gitpath: 'safdsfasdfsadfasdfasdf', age: 20});

var index = require('./routes/index');
var teams = require('./routes/teams');
var gitp = require('./routes/gitpath');
var gitps = require('./routes/gitpath_set');
var servers = require('./routes/servers');
var users = require('./routes/users');
var exports = require('./routes/export');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/teams', teams);
app.use('/gitpath', gitp);
app.use('/gitpath_set', gitps);
app.use('/servers', servers);
app.use('/users', users);
app.use('/export', exports);

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
