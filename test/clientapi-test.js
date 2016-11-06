import sinon from 'sinon'
import assert from 'assert'
import { searchIngredients, searchResults, addIngredient, delIngredient, getFridge}  from '../app/clientapi'
import axios from 'axios'
import sinonStubPromise from 'sinon-stub-promise'

sinonStubPromise(sinon)
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.navigator = {
  userAgent: 'node.js'
};
global.document = doc
global.window = doc.defaultView

describe('clientapi', function() {
  describe('searchIngredients', function() {
    it('should return with the answer when parsed text', sinon.test(function() {
      var res = {data:'bar'}
      var input = 'foo'
      var mock = sinon.stub(axios, 'get').returnsPromise().resolves(res)
      searchIngredients(input).then(function(data) {
        assert.equal(data[0], 'bar')
      })
      mock.restore()
    }))
  })
  describe('searchResults', function() {
    it('should return with answer when parsed array', sinon.test(function() {
      var res = {data:'bar'}
      var input = ['foo', 'bar']
      var mock = sinon.stub(axios, 'get').returnsPromise().resolves(res)
      searchIngredients(input).then(function(data) {
        assert.equal(data[0], 'bar')
      })
      mock.restore()
    }))
  })
  describe('getFridge', function() {
    it('should return with the fridge', sinon.test(function() {
      var res = {data:'bar'}
      var mock = sinon.stub(axios, 'get').returnsPromise().resolves(res)
      getFridge().then(function(data) {
        assert.equal(data[0], 'bar')
      })
      mock.restore()
    }))
  })
  describe('addIngredient and delIngredient', function() {
    it('should call axios.post', sinon.test(function() {
      var spy = sinon.spy(axios, 'post')
      var res = {value:'foo'}
      var mock = sinon.stub(global.document, 'querySelector').returns(res)
      var ingredient = 'foo'
      addIngredient(ingredient)
      delIngredient(ingredient)
      assert.equal(spy.calledTwice, true)
    }))
  })
  it('should return err when something happens', sinon.test(function() {
    var err = 'fooError'
    var input = 'foo'
    var mock = sinon.stub(axios, 'get').returnsPromise().rejects(err)
    searchIngredients(input).catch(function(err) {
      assert.equal(err, 'fooError')
    })
    searchResults(input, 1).catch(function(err) {
      assert.equal(err, 'fooError')
    })
    getFridge().catch(function(err) {
      assert.equal(err, 'fooError')
    })
    mock.restore()
  }))
})
