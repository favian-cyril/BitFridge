var express = require('express')
var router = express.Router()
var apicalls = require('../modules/apicalls')
var fridge = require('../modules/fridge')

var searchIngredients = apicalls.searchIngredients

router.get('/ingredients/autocomplete', function(req, res, next) {
  var path = req.path
  var params = req.query
  searchIngredients(path, params, function (err, response, body) {
    if (!err && response.statusCode === 200)
      res.json(body)
    else
      next(err)
  })
})

router.post('/fridge/add', function (req, res, next) {
  fridge.addIngredient(req, function (err) {
    if (!err) {
      console.log(`Added ${item.name} to fridge!`)
      res.status(200).end()
    } else {
      next(err)
    }
  })
})

module.exports = router
