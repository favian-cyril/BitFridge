var request = require('request')
var append = require('append-query')

/**
We have clientapi.js to give out a temporary baseUrl for development.
We use this js file to give out certain functions like searchingredients
and add params.
*/
// DEVELOPMENT ONLY
const baseUrl = 'http://localhost:3000/api/'

/** @class */

/** this function will search the ingredients
* @param {string} string - the ingredient's name
*@param {getCallback} cb - callback
*/
function searchIngredients (string, cb) {
  var url = baseUrl + 'ingredients/autocomplete'
  var params = {
    metaInformation: true,
    number: 6,
    query: string
  }
  get(url, params, cb)
}

function get (url, params, cb) {
  /** @callback getCallback
  *@param {string} url is the var url from function searchIngredients()
  *@param params - is the var params from function searchIngredients()
  *@param cb - is a callback
  */
  url = append(url, params)
  request.get(url, function (err, res, body) {
    if (!err && res.statusCode == 200)
      cb(null, res, JSON.parse(body))
  }).on('error', function (err) {
    cb(err)
  })
}
/**
*Search Ingredients
@module search ingredients
*/
module.exports = {
  /**searching the Ingredients*/
  searchIngredients: searchIngredients
}
