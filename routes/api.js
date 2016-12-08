var express = require('express')
var router = express.Router()
var apicalls = require('../modules/apicalls')
var User = require('../models/user')

var searchIngredients = apicalls.searchIngredients
var searchResults = apicalls.searchResults

router.get('/ingredients/autocomplete', function (req, res, next) {
  var params = req.query
  var searchText = params.query
  var number = params.number
  searchIngredients(searchText, number, function (err, body) {
    if (!err) {
      res.json(body)
    } else {
      next(err)
      console.error(err)
    }
  })
})

router.get('/recipes/results', function (req, res, next) {
  var params = req.query
  var ingredients = JSON.parse(params.ingredients)
  var page = parseInt(params.page)
  searchResults(ingredients, page, function (err, body) {
    if (!err) {
      res.json(body)
    } else {
      next(err)
      console.error(err)
    }
  })
})

router.get('/user/data', function (req, res, next) {
  User.findOne({ id: req.session.user.id }, null, function (err, doc) {
    if (!err) {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache')
      res.json({ user: doc })
    } else {
      res.status(404).end()
    }
  })
})

router.post('/user/sync', function (req, res, next) {
  const userData = req.body
  User.syncUser(userData, function (err) {
    if (!err) {
      res.status(200).end()
    } else {
      next(err)
    }
  })
})

module.exports = router
