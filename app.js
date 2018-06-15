var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const config = require('./config/secret');

var logger = require('morgan'); // For logging request details of whatever requests user has made to the server. Basically a logger, on any requests being made,it generates logs automatically. If the request is get then it will show get/ and then whatever URL the user is targetting at.

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
// set mongoose.Promise to my ES6-style promise constructor and mongoose will use it.
mongoose.Promise = global.Promise;

mongoose.connect(config.database)
  .then(() => console.log('Mongodb connection successful'))
  .catch((err) => console.error(err));


// If I only had locally installed mongo (i.e. no mLab) then replace the first line above with the below line
// mongoose.connect('mongodb://localhost/student')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var students = require('./routes/students');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', students);
/* The above line is for mounting the router on the app. Meaning whenever, I am going to  localhost:3000/users - users route will be rendered. app.use() is intended for binding middleware to your application. The path is a "mount" or "prefix" path and limits the middleware to only apply to any paths requested that begin with it.

In other words it means, I want localhost:3000/users route to go and mount usersRouter.
The second argument to app.use means I am referring to './routes/users' file which I imported above
So, whatever path I am adding in < router.get('/', callback()) > in file in './routes/users' - that will only be added after the path, I am specifying here in this main app.js file. This is exactly the setup I have in my DevBook project and its the standard boilerplate.
*/

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
