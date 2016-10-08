var express = require('express')
var router = express.Router()
var apicalls = require('../modules/apicalls')

var searchIngredients = apicalls.searchIngredients

router.get('/ingredients/autocomplete', function(req, res, next) {
  var path = req.path
  var params = req.query
  searchIngredients(path, params, function (err, response, body) {
    if (!err && response.statusCode === 200)
      res.json(body)
    else
      res.status(500).json(err)
  })
})

router.post('/fridge/add', function (req, res, next) {
  var item = req.body.item
  console.log(`Added ${item.name} to fridge!`)
  res.status(200).end()
})

module.exports = router
