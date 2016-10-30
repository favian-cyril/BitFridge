var request = require('request')
var append = require('append-query')
var axios = require('axios')

require('dotenv').config()

var SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY
var YUMMLY_APP_ID = process.env.YUMMLY_APP_ID
var YUMMLY_API_KEY = process.env.YUMMLY_API_KEY

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
  var baseUrl = 'http://api.yummly.com/v1/api'
  var ingrParam = ''
  ingredients.forEach( function (i) {
    ingrParam += '&allowedIngredient[]=' + i
  })
  var params = {
    _app_id: YUMMLY_APP_ID,
    _app_key: YUMMLY_API_KEY,
    maxResult: '8',
    start: page * 8
  }
  var resultsUrl = append(baseUrl + '/recipes', params) + ingrParam
  axios.get(resultsUrl).then(function (response) {
    var matches = response.data.matches
    var requests = matches.map(function (recipe) {
      var url = baseUrl + '/recipe/' + recipe.id
      return axios.get(append(url, { _app_id: YUMMLY_APP_ID, _app_key: YUMMLY_API_KEY }))
    })
    axios.all(requests).then(function (args) {
      args.forEach(function (res, i) {
        response.data.matches[i].sourceUrl = res.data.source.sourceRecipeUrl
      })
      response.statusCode = 200
      cb(null, response, response.data)
    }).catch(function (error) {
      console.error('Failed to gather recipe sourceUrls.')
      cb(new Error(error.message))
    })
  }).catch(function (error) {
    console.error('Failed to return search results.')
    cb(new Error(error.message))
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
      if (!res.statusCode) cb(new Error('offline'))
      else if (!err && res.statusCode == 200)
        cb(null, res, JSON.parse(body)) // Correct way to call callback
      else
        cb(err)
    })
}

module.exports = {
  searchIngredients: searchIngredients,
  searchResults: searchResults
}
