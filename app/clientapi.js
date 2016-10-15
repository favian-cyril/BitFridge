var request = require('request')
var append = require('append-query')
var $ = require('jquery')

// DEVELOPMENT ONLY
const baseUrl = 'http://localhost:3000/api/'

function searchIngredients (string, cb) {
  var url = baseUrl + 'ingredients/autocomplete'
  var params = {
    metaInformation: true,
    number: 5,
    query: string
  }
  get(url, params, cb)
}

function addIngredient(ingredient, cb) {
  var url = baseUrl + 'fridge/add'
  var form = { item: ingredient }
  post(url, form, cb)
}

function delIngredient(ingredient, cb) {
  var url = baseUrl + 'fridge/del'
  var form = { item: ingredient }
  post(url, form, cb) 
}

function getFridge(cb) {
  var url = baseUrl + 'fridge/get'
  get(url, null, cb)
}

function get (url, params, cb) {
  if (params)
    url = append(url, params)
  request.get(url, function (err, res, body) {
    if (!err && res.statusCode == 200)
      cb(null, res, JSON.parse(body))
    else if (res.statusCode == 500) {
      // DEVELOPMENT ONLY
      body = JSON.parse(res.body)
      err = new Error(body.message)
      err.stack = body.stack
      console.error(err)
      // DEVELOPMENT ONLY
      cb(err)
    }
  }).on('error', function (err) {
    cb(err)
  })
}

function post (url, obj, cb) {
  var csrfToken = $("input[name='_csrf']").val()
  var options = {
    headers: { 'X-CSRF-Token': csrfToken },
    url: url,
    form: obj
  }
  request.post(options, function (err, res, body) {
    if (!err && res.statusCode == 200)
      cb(null, res)
    else if (res.statusCode == 500) {
      // DEVELOPMENT ONLY
      body = JSON.parse(res.body)
      err = new Error(body.message)
      err.stack = body.stack
      console.error(err)
      // DEVELOPMENT ONLY
      cb(err)
    }
  }).on('error', function (err) {
    cb(err)
  })
}

module.exports = {
  searchIngredients: searchIngredients,
  addIngredient: addIngredient,
  delIngredient: delIngredient,
  getFridge: getFridge
}
