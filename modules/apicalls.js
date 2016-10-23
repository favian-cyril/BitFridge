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
  var url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food' + path
  get(url, params, cb)
}

function searchResults (ingredients, page, cb) {
  var params = '&'
  ingredients.forEach( function (i) {
    params = params + 'allowedIngredient[]=' + i
  })
  var url = 'http://api.yummly.com/v1/api/recipes?_app_id=' + YUMMLY_APP_ID + '&_app_key=' + YUMMLY_API_KEY + params + '&maxResult=' + page
  request.get(url, function (err, res, body) {
    if (!err && res.statusCode == 200)
      cb(null, res, JSON.parse(body))
    else
      cb(err)
  })
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
  searchIngredients: searchIngredients,
  searchResults: searchResults
}
