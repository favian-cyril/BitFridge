var express = require('express')

// express utility middleware
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var csrf = require('csurf')
var RedisStore = require('connect-redis')(session)
var mongoose = require('mongoose')
var passport = require('passport')

// fetch .env environment variables
require('dotenv').config()

// fetch app config files
var dbConfig = require('./config/db')
var authConfig = require('./config/auth')

// routes middleware
var routes = require('./routes/index')
var api = require('./routes/api')
var login = require('./routes/login')

// initialize app
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/public/favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// connect to mongoose
mongoose.connect(dbConfig.url[app.get('env')])
mongoose.connection.on('error', console.error.bind(console, 'Connection Error:'))
mongoose.connection.on('open', function() {
  console.log('Successfully connected to MongoDB database.')
})

// Initialize Passport and restore auth state from session
passport.use(authConfig.facebookStrategy)
passport.use(authConfig.googleStrategy)

passport.serializeUser(function(req, profile, cb) {
  cb(null, profile)
});

passport.deserializeUser(function(req, obj, cb) {
  cb(null, obj)
});

app.use(passport.initialize())
app.use(passport.session())

// session store options depend on environment
var options = {
  secret: 'this is a not-so-secret key',
  saveUninitialized: false,
  resave: false
}

if (app.get('env') === 'production') {
  options.store = new RedisStore({
    host: 'localhost',
    port: 6379
  })
}

// session store setup
var sessionMiddleware = session(options)
app.use(sessionMiddleware)

// session check and retry
app.use(function (req, res, next) {
  var tries = 3
  function lookupSession (err) {
    if (err) return next(err)
    tries -= 1
    if (req.session !== undefined) return next()
    if (tries < 0) return next(new Error('Session lookup failed. Retrying..'))
    sessionMiddleware(req, res, lookupSession)
  }
  lookupSession()
})

// csrf middleware
app.use(csrf({ cookie: false }))

// router middleware
app.use('/', routes)
app.use('/api', api)
app.use('/login', login)

// Logout from session
app.get('/logout', function(req, res, next) {
  if (req.isAuthenticated || req.isAuthenticated()) {
    req.session.user = null
    req.logout()
  }
  res.redirect('/')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
