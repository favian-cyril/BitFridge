var express = require('express')
var router = express.Router()
var apicalls = require('../modules/apicalls')

var searchIngredients = apicalls.searchIngredients

router.get('/ingredients/autocomplete', function(req, res, next) {
  let url = req.url
  let params = req.query
  searchIngredients(url, params, function (err, response, body) {
    if (!err && response.statusCode === 200)
      res.json(body)
    else
      res.status(response.statusCode).json(err)
  })
})

module.exports = router