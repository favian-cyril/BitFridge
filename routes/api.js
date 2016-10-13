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
      res.status(500).json(err)
  })
})

router.post('/fridge/add', function (req, res, next) {
  fridge.addIngredient(req, function (err) {
    if (!err) {
      console.log(`Added ${req.body.item.name} to fridge!`)
      res.status(200)
    } else {
      console.log('Failed to save to database.')
      res.status(500).json(err)
    }
  })
})

router.post('/fridge/del', function (req, res, next) {
  fridge.delIngredient(req, function (err) {
    if (!err) {
      console.log(`Deleted ${req.body.item.name} to fridge!`)
      res.status(200)
    } else {
      console.log(`Failed to delete from database.`)
      res.status(500).json(err)
    }
  })
})

module.exports = router
