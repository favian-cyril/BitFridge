var simple = require('simple-mock')
var assert = require('assert')
var searchIngredients = require('../app/models/apicalls')
var request = require('request')
var events = require('events');

describe('searchIngredients()', function() {
  afterEach(function () {
  simple.restore()
})
  it('should call get', function() {
    simple.mock(searchIngredients, 'get')
    searchIngredients('foo', true, function(err, res, body) {
      if (err) return done(err)

      assert.equal(apicalls.get.called, true)
    })
  })
  it('should return data', function() {
    simple.mock(request, 'get').callbackWith(null, 200, 'foo')

    searchIngredients('foo', true, function(err, res, body) {
      if (err) return done(err)

      assert.equal(body, 'foo')
    })
  })
  it('should catch error', function() {
    simple.mock(request, 'get').callbackWith('error', 200, 'foo')

    searchIngredients('foo', true, function(err, res, body) {
      assert.equal(err, 'error')
    })
  })
})
