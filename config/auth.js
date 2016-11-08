var FacebookStrategy = require('passport-facebook').Strategy

module.exports = {
  facebookStrategy: new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/return',
    passReqToCallback: true
  },
  function (req, accessToken, refreshToken, profile, cb) {
    return cb(null, profile)
  })
}