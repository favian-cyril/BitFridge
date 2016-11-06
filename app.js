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

// fetch .env environment variables
require('dotenv').config()

// routes middleware
var routes = require('./routes/index')
var api = require('./routes/api')

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
    res.json({
      message: err.message,
      stack: err.stack
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
