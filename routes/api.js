/**
 * This class requires the modules express & apicalls.js
 * @requires express
 * @requires ../modules/apicalls
 */

var express = require('express')
var router = express.Router()
var apicalls = require('../modules/apicalls')

/**
*@summary to call spoonacular's API
*/
var searchIngredients = apicalls.searchIngredients

/** @param {string} ingredients/autocomplete - path to get the ingredient
* @param function(req, res, next) - handler for requesting, parameter : request, result and next
*/
router.get('/ingredients/autocomplete', function(req, res, next) {
  var path = req.path
  var params = req.query

  /**
  *@function from apicalls.js
  *@param path - request path
  *@param params - request query
  *@param function
  #@param err - error code
  *@param response - response. if error code and the status code are 200 the function will return json object.
  *@param  body - json object
  *@return {object} json if not 200, then return error

  */
  searchIngredients(path, params, function (err, response, body) {
    if (!err && response.statusCode === 200)
      res.json(body)
    else
      res.status(500).json(err)
  })
})
/**@module router */
module.exports = router
