var simple = require('simple-mock')
var assert = require('assert')
var searchIngredients = require('../app/models/apicalls')
var request = require('request')
var events = require('events');

describe('searchIngredients()', function() {
  afterEach(function () {
  simple.restore()
})
  it('should call _get', function() {
    simple.mock(searchIngredients, '_get')
    searchIngredients('foo', true, function(err, res, body) {
      if (err) return done(err)

      assert.equal(apicalls._get.called, true)
    })
  })
  it('should return json data', function() {
    simple.mock(requeststub, 'get').callbackWith(null, 200, 'foo')

    searchIngredients('foo', true, function(err, res, body) {
      if (err) return done(err)

      assert.equal(JSON.stringify(body), 'foo')
    })
  })
})
