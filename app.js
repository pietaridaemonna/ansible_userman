var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieSession = require('cookie-session');
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
var create_server = require('./routes/create_server');


var compression = require('compression');
var helmet = require('helmet');
var csp = require('helmet-csp')

var app = express();
app.use(compression());

app.use(helmet.xssFilter());
app.use(helmet.noCache());
app.use(helmet.noSniff());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());

//Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
// Implement CSP with Helmet
app.use(csp({
    // Specify directives as normal.
    directives: {
        defaultSrc: ["'self'", 'default.com'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ['style.com'],
        fontSrc: ["'self'", 'fonts.com'],
        imgSrc: ['img.com', 'data:'],
        sandbox: ['allow-forms', 'allow-scripts'],
        reportUri: '/report-violation',
        objectSrc: ["'none'"],
        upgradeInsecureRequests: true
    },

    // This module will detect common mistakes in your directives and throw errors
    // if it finds any. To disable this, enable "loose mode".
    loose: false,

    // Set to true if you only want browsers to report errors, not block them.
    // You may also set this to a function(req, res) in order to decide dynamically
    // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
    reportOnly: false,

    // Set to true if you want to blindly set all headers: Content-Security-Policy,
    // X-WebKit-CSP, and X-Content-Security-Policy.
    setAllHeaders: false,

    // Set to true if you want to disable CSP on Android where it can be buggy.
    disableAndroid: false,

    // Set to false if you want to completely disable any user-agent sniffing.
    // This may make the headers less compatible but it will be much faster.
    // This defaults to `true`.
    browserSniff: true
}))
// @see https://github.com/evilpacket/helmet
// you should activate even more headers provided by helmet
app.disable('x-powered-by');







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser('sdlkjf@JLRK#J#$kdfj', {resave: false, autosave: true, secure: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
    name: 'session',
    keys: ['43#)RSFDAfds', 'kdfj*#(R_29jdkey2'],
    secret: 'sdfjKJ#@#$R*(@_!FHJSAKF+@)8930u2',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}))


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
app.use('/create_server', create_server);



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
