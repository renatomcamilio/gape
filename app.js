
/**
 * Module dependencies
 */
var express = require('express');
var path = require('path');

/**
 * Express Middlewares
 */
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var swig = require('swig');

// Express app instance
var app = express();

// registering swig template engine
app.engine('html', swig.renderFile);

// settings - all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'server', 'view'));
app.set('view engine', 'html');
if ('development' == app.get('env')) {
    app.set('view cache', false);
    swig.setDefaults({ cache: false });
}

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());

/**
 * the built-in session is not production ready
 * we should change to a session-storage like redis or something
 */
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'kds43ls@kds120k'
}));

// body parsing middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// mount `/public` folder for client-side resources
app.use(express.static(path.join(__dirname, 'public')));

// default route, will be in a `routes/` folder
app.get('/:name?', function (req, res) {
    res.render('index', {
        name: req.params.name || 'world'
    });
});

// error handling middleware should be loaded after loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

