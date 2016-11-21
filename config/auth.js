var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var User = require('../models').user


function signUp (req, profile, accountType, cb) {
  User.findOne({ id: req.session.user.id }, function (err, user) {
    if (err) {
      cb(err)
    } else {
      user.name = profile.name.givenName
      user[accountType] = {
        id: profile.id,
        name: profile.name.givenName,
        picture: profile.photos[0].value
      }
      req.session.user = user.toObject()
      user.save(function (err, user) {
        if (err) {
          cb(err)
        } else {
          console.log(`User ${user[accountType].name} signed up with ${accountType}.`)
          cb(null, user)
        }
      })
    }
  })
}

function logIn (req, profile, accountType, cb) {
  console.log(`User ${user[accountType].name} logged in via ${accountType}.`)
  cb(null, user)
}

function verificationCallback (accountType) {
  return function (req, accessToken, refreshToken, profile, cb) {
    // find user that account type (facebook/google)
    const accountID = `${accountType}.id`
    User.findOne({ accountID: profile.id }, function (err, user) {
      if (err) {
        cb(err)   // something bad
      } else if (user) {
        logIn(req, profile, accountType, cb) // user with that account exists, log in the user
      } else if (!user && req.session.user) {
        signUp(req, profile, accountType, cb) // user with that account doesn't exist, sign up
      } else if (!req.session.user) {
        err = new Error('Not Found')
        err.status = 404
        cb(err)
      }
    })
  }
}

module.exports = {
  facebookStrategy: new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/return',
    profileFields: ['name', 'id', 'picture'],
    passReqToCallback: true
  }, verificationCallback('facebook')),
  googleStrategy: new GoogleStrategy({
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: 'http://localhost:3000/login/google/return',
    passReqToCallback: true
  }, verificationCallback('google'))
}