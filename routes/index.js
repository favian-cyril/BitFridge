var express = require('express')
var uuid = require('uuid')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.id) {
    req.session.id = uuid.v1()
  }
  var baseurl
  if (process.env.NODE_ENV == 'production') {
    baseurl = 'http://188.166.247.122/api/'
  } else {
    baseurl = 'http://localhost:3000/api/'
  }
  res.render('index', { title: 'BitFridge', _csrfToken: req.csrfToken(), baseurl: baseurl })
})

module.exports = router
