var createError = require('http-errors');
var express = require('express');
const methodOverride = require('method-override')
const jwt = require('jsonwebtoken');


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var bodyParser = require('body-parser');

const models = require('./db/models');


app.use(bodyParser.urlencoded({ extended: true }));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')



var server = app.listen(5000, function () {
    console.log('Node server is running..');
});
;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.use('/', indexRouter);
app.use('/', usersRouter);

app.use(cookieParser());

app.use(function authenticateToken(req, res, next) {
  // Gather the jwt access token from the cookie
  const token = req.cookies.mpJWT;

  if (token) {
    jwt.verify(token, "AUTH-SECRET", (err, user) => {
      if (err) {
        console.log(err)
        // redirect to login if not logged in and trying to access a protected route
        res.redirect('/login')
      }
      req.user = user
      next(); // pass the execution off to whatever request the client intended
    })
  } else {
    next();
  }
});

app.use((req, res, next) => {
// if a valid JWT token is present
  if (req.user) {
  // Look up the user's record
    models.User.findByPk(req.user.id).then(currentUser => {
    // make the user object available in all controllers and templates
      res.locals.currentUser = currentUser;
      next()
    }).catch(err => {
      console.log(err)
    })
  } else {
    next();
  }
});
app.use(cookieParser("BETTERSECRET"));
const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 60) // 60 days

app.use(session({
  secret: "ANOTHERSECRET",
  cookie: {expires: expiryDate },
  // store: sessionStore,
  resave: true,
  saveUninitialized: true
}));

require('./controllers/users')(app, models);
require('./routes/locations')(app, models);
require('./routes/reviews')(app, models);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
