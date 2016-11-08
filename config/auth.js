var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const verificationCallback = function (req, accToken, refToken, profile, cb) {
  User.findOne({ id: profile.id }, function (err, user) {
    if (!err && user) {
      cb(null, user)
    } else if (!err && !user) {
      User.findOne({ id: req.session.user.id }, function (err, user) {
        if (!err) {
          user.id = profile.id
          user.save(function (err, user) {
            if (!err) cb(null, user)
          })
        } else cb(err)
      })
    } else cb(err)
  })
}

module.exports = {
  facebookStrategy: new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/return',
    passReqToCallback: true
  }, verificationCallback),
  googleStrategy: new GoogleStrategy({
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: 'http://localhost:3000/login/google/return',
    passReqToCallback: true
  }, verificationCallback)
}