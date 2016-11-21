var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var User = require('../models').user


function signUp (req, profile, accountType, cb) {
  User.findOne({ id: req.session.user.id }, function (err, user) {
    if (err) {
      cb(err)
    } else if (!user) {
      cb(new Error(`User with ID ${req.session.user.id} not found.`))
    } else {
      user.name = profile.name.givenName
      user[accountType] = {
        email: profile.emails[0].value,
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
  const accountEmail = `${accountType}.email`
  const email = profile.emails[0].value
  User.findOne({ accountEmail: email }, function (err, user) {
    if (err) {
      cb(err)
    } else if (!user) {
      cb(new Error(`User with email ${email} not found.`))
    } else {
      console.log(`User ${user.name} logged in via ${accountType}.`)
      cb(null, user)
    }
  })
}

function verificationCallback (accountType) {
  return function (req, accessToken, refreshToken, profile, cb) {
    // find user that account type (facebook/google)
    const accountEmail = `${accountType}.email`
    console.log(profile);
    User.findOne({ accountEmail: profile.emails[0].value }, function (err, user) {
      console.log({ user, reqUser: req.session.user })
      if (err) {
        cb(err)   // something bad
      } else if (!user) {
        console.log('Signing up...')
        signUp(req, profile, accountType, cb) // user with that account exists, log in the user
      } else if (user && req.session.user) {
        console.log('Logging in...')
        logIn(req, profile, accountType, cb) // user with that account doesn't exist, sign up
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
    profileFields: ['name', 'email', 'picture'],
    passReqToCallback: true
  }, verificationCallback('facebook')),
  googleStrategy: new GoogleStrategy({
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: 'http://localhost:3000/login/google/return',
    passReqToCallback: true
  }, verificationCallback('google'))
}