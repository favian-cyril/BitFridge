var sinon = require('sinon')
var assert = require('assert')
var searchIngredients = require('../app/models/apicalls')
var request = require('request')
var events = require('events');

describe('searchIngredients()', function() {
  it('should call get', function() {
    var mock = sinon.spy(searchIngredients.get)
    searchIngredients('foo', true, function(err, res, body) {
      if (err) return done(err)

      assert.equal(mock.calledOnce, true)
    })
  })
  it('should call request.get function', function() {
    var mock = sinon.stub(request, 'get')
    searchIngredients('foo', function(err, res, body) { })
    mock.restore()
    sinon.assert.calledOnce(mock)
  })
})
