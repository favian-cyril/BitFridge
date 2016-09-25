var request = require('request')
var append = require('append-query')

var SPOONACULAR_API_KEY = 'glMwvNQWGMmsh9O1FUmZDPp6sJ67p1aNuApjsn8FLnNij2cDCx'

/**
 * Performs ingredient search with ingredient metadata.
 *
 * Callback receives (err, res, body)
 */
function searchIngredients (string, autocomplete, cb) {
  var url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete'
  var n = autocomplete ? 6 : 100
  var params = {
    metaInformation: true,
    number: n,
    query: string
  }
  get(url, params, cb)
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
        cb(null, res, JSON.parse(body))
      else {
        cb(err)
      }
    })
}


module.exports = searchIngredients