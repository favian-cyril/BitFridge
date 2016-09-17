var request = require('request')
var append = require('append-query')

/**
 * Wrapper GET function using 'request' library
 * Callback receives (err, res, body)
 */
function _get (options, cb) {
  request
    .get(options, function (err, res, body) {
      if (!err && res.statusCode == 200)
        cb(null, res, body)
    })
    .on('error', function (err) {
      cb(err)
    })
}

/**
 * Performs ingredient search with ingredient metadata.
 *
 * Callback receives (err, res, body)
 */
function searchIngredients (string, autocomplete, cb) {
  var endpoint = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete?'
  var n = autocomplete ? 6 : 100
  var options = {
    url: append(endpoint, {
      metaInformation: true,
      number: n,
      query: string
    }),
    headers: {
      'X-Mashape-Key': 'VC9n83wvOAmsh7U0iEocA8CClLhsp1OX8Z3jsnzeJx48DHRm4A'
    }
  }
  console.log(options.url)
  _get(options, cb)
}



module.exports = searchIngredients