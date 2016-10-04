var request = require('request')
var append = require('append-query')

// DEVELOPMENT ONLY
const baseUrl = 'http://localhost:3000/api/'

// Define internal errors
function ServerError(msg) {
  this.name = 'ServerError'
  this.message = msg
}

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
  url = append(url, params)
  request.get(url, function (err, res, body) {
    if (!err && res.statusCode == 200)
      cb(null, res, JSON.parse(body))
    else {
      if (res.statusCode == 500) {
        var err = new ServerError('Internal server error. Contact administrator.')
        cb(err)
      }
    }
  })
}

module.exports = {
  searchIngredients: searchIngredients
}