var request = require('request')
var append = require('append-query')

require('dotenv').config()

var SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY

/**
 * Performs ingredient search with ingredient metadata.
 *
 * Callback receives (err, res, body)
 */
function searchIngredients (path, params, cb) {
  if (Object.keys(params).length == 0) {
    var err = new Error('Missing parameters for API request.')
    cb(err)
  } else {
    var url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food' + path
    get(url, params, cb)
  }
}

/**
 * Wrapper GET function using 'request' library
 * Callback receives (err, res, body)
 */
function get (url, params, cb) {
  var options = {
    url: append(url, params),
    headers: { 'X-Mashape-Key': SPOONACULAR_API_KEY }
  }
  request
    .get(options, function (err, res, body) {
      if (!err && res.statusCode == 200)
        cb(null, res, JSON.parse(body)) // Correct way to call callback
      else
        cb(err)
    })
}

module.exports = {
  searchIngredients: searchIngredients
}
