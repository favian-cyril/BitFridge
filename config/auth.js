var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var User = require('../models').user

const verificationCallback = function (accountType) {
  return function (req, accessToken, refreshToken, profile, cb) {
    // find user that account type (facebook/google)
    const accountID = `${accountType}.id`
    User.findOne({ accountId: profile.id }, function (err, user) {
      if (err) {
        cb(err)   // something bad
      } else if (user) {   // user with that account exists, log in the user
        console.log(`User ${user[accountType].name} logged in via ${accountType}.`)
        cb(null, user)
      } else if (!user) {   // user with that account doesn't exist, sign up
        User.findOne({ id: req.session.user.id }, function (err, user) {
          if (err) {
            cb(err)
          } else {
            user.name = profile.name.givenName
            user[accountType] = {
              id: profile.id,
              name: profile.name.givenName,
              token: accessToken,
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