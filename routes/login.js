var express = require('express')
var passport = require('passport')
var router = express.Router()

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] }))

router.get('/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/')
  })

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/return',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/')
  })

module.exports = router
