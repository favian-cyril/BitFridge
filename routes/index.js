var express = require('express')
var uuid = require('uuid')
var constants = require('../app/config/constants')
var router = express.Router()

const baseurl = process.env.NODE_ENV === 'production'
  ? 'http://188.166.247.122/api/'
  : 'http://localhost:3000/api/'

/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.session.id) {
    req.session.id = uuid.v1()
  }
  res.render('index', { title: 'BitFridge', _csrfToken: req.csrfToken(), baseurl: baseurl })
})

router.get('/dash', function (req, res, next) {
  if (!req.session.fridge || req.session.fridge.length < constants.REDIRECT_INGR_THRESHOLD) {
    res.redirect('/')
  } else {
    res.render('index', { title: 'BitFridge', _csrfToken: req.csrfToken(), baseurl: baseurl })
  }
})

module.exports = router
