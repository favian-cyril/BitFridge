import sinon from 'sinon'
import assert from 'assert'
import {searchIngredients, searchResults}  from '../modules/apicalls'
import axios from 'axios'
import sinonStubPromise from 'sinon-stub-promise'

sinonStubPromise(sinon)

describe('server apicalls', function() {
  describe('searchIngredients', function() {
    it('should return with answer when parsed text', sinon.test(function() {
      var res = {
        data: [
          { sourceUrl: 'foo' },
          { sourceUrl: 'bar' }
        ]
      }
      var input = 'foo'
      var mock = sinon.stub(axios, 'get').returnsPromise().resolves(res)
      searchIngredients(input, 5, function(err, body) {
        assert.equal(body,res.data)
        mock.restore()
      })
    }))
    it('should return with error when something happens', sinon.test(function() {
      var err = 'fooError'
      var input = 'foo'
      var mock = sinon.stub(axios, 'get').returnsPromise().rejects(err)
      searchIngredients(input, 5, function(error, body) {
        assert.equal(error, err)
        mock.restore()
      })
    }))
  })
  describe('searchResults', function() {
    it('should return with answer when parsed an array of ingredients', sinon.test(function() {
      var input = ['foo','bar','baz']
      var res = {
        data: [
          { sourceUrl: 'foo' },
          { sourceUrl: 'bar' },
          { sourceUrl: 'baz' }
        ]
      }
      var linkArr = ['link','link','link']
      var mock1 = sinon.stub(axios, 'get').returnsPromise().resolves(res)
      searchResults(input, 1, function(err, body) {
        assert.equal(mock1.callCount, res.data.length+1)
        mock1.restore()
      })
    }))
  })
})
