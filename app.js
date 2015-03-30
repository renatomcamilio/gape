
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

// Swig template engine init
app.engine('swig', swig.renderFile);

// settings - all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'swig');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'kds43ls@kds120k'
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(multer());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.send("Hello there!");
});

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

