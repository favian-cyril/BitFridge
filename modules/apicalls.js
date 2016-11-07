var axios = require('axios')
var append = require('append-query')

require('dotenv').config()

var SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY

/**
 * Performs ingredient search with ingredient metadata.
 *
 * Callback receives (err, res, body)
 */
function searchIngredients (searchText, number, cb) {
  var url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete'
  const headers = { 'X-Mashape-Key': SPOONACULAR_API_KEY }
  const params = { query: searchText, number: number, metaInformation: true }
  _get(url, params, headers, cb)
}

function searchResults (ingredients, page, cb) {
  var baseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'
  var ingrParam = ''
  ingredients.forEach(function (i) {
    ingrParam += i + ','
  })
  ingrParam = ingrParam.substring(0, ingrParam.length - 1)
  const headers = { 'X-Mashape-Key': SPOONACULAR_API_KEY }
  var params = {
    fillIngredients: true,
    ingredients: ingrParam,
    limitLicense: true,
    number: 8 * page,
    ranking: 2
  }
  var resultsUrl = append(baseUrl + 'findByIngredients', params)
  axios.get(resultsUrl, { headers: headers }).then(function (response) {
    var start = (page - 1) * 8
    var matches = response.data.slice(start)
    var requests = matches.map(function (recipe) {
      var url = baseUrl + recipe.id + '/information?includeNutrition=false'
      return axios.get(url, { headers: headers })
    })
    axios.all(requests).then(function (args) {
      args.forEach(function (res, i) {
        matches[i].sourceUrl = res.data.sourceUrl
      })
      cb(null, matches)
    }).catch(function (error) {
      console.error('Failed to gather recipe sourceUrls.')
      cb(error)
    })
  }).catch(function (error) {
    console.error('Failed to return search results.')
    cb(error)
  })
}

/**
 * Wrapper GET function using 'request' library
 * Callback receives (err, res, body)
 */
function _get (url, params, headers, cb) {
  const fetchUrl = append(url, params)
  axios.get(fetchUrl, { headers: headers })
    .then(function (res) {
      cb(null, res.data)
    })
    .catch(function (err) {
      cb(err)
    })
}

module.exports = {
  searchIngredients: searchIngredients,
  searchResults: searchResults
}
