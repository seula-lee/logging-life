var express = require('express');
var path    = require('path');
var favicon = require('serve-favicon');
var logger  = require('morgan');
var multer  = require('multer');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

// getting routes module
var index   = require('./app_server/routes/index');
var uploads  = require('./app_server/routes/uploads');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views', 'pages'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/uploads', uploads);

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
