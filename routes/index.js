var express = require('express')
var uuid = require('uuid')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.key) {
    req.session.key = uuid.v1()
  }
  res.render('index', { title: 'BitFridge', _csrfToken: req.csrfToken() })
})

module.exports = router
