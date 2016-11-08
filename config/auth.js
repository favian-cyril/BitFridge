var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

module.exports = {
  facebookStrategy: new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/return',
    passReqToCallback: true
  },
  function (req, accessToken, refreshToken, profile, cb) {
    return cb(null, profile)
  }),
  googleStrategy: new GoogleStrategy({
      clientID: process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
      callbackURL: 'http://localhost:3000/login/google/return',
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, cb) {
      return cb(null, profile)
    })
}