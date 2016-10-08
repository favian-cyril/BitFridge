var request = require('request')
var append = require('append-query')

// DEVELOPMENT ONLY
const baseUrl = 'http://localhost:3000/api/'

function searchIngredients (string, cb) {
  var url = baseUrl + 'ingredients/autocomplete'
  var params = {
    metaInformation: true,
    number: 6,
    query: string
  }
  get(url, params, cb)
}

function addIngredient(ingredient, cb) {
  var url = baseUrl + 'fridge/add'
  var form = { item: ingredient }
  post(url, form, cb)
}

function get (url, params, cb) {
  url = append(url, params)
  request.get(url, function (err, res, body) {
    if (!err && res.statusCode == 200)
      cb(null, res, JSON.parse(body))
  }).on('error', function (err) {
    cb(err)
  })
}

function post (url, obj, cb) {
  request.post({ url: url, form: obj }, function (err, res, body) {
    if (!err && res.statusCode == 200)
      cb(null, res)
  }).on('error', function (err) {
    cb(err)
  })
}

module.exports = {
  searchIngredients: searchIngredients,
  addIngredient: addIngredient
}