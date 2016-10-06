import sinon from 'sinon'
import assert from 'assert'
import { searchIngredients, get }  from '../app/clientapi'
import request from 'request'


describe('client searchIngredients()', function() {
  it('should call get', function() {
    var mock = sinon.spy(get)
    searchIngredients('foo', true, function(err, res, body) {
      if (err) return done(err)

      assert.equal(mock.calledOnce, true)
    })
  })
  it('should call request.get function', function() {
    var on = { on: sinon.stub() }
    var mock = sinon.stub(request, 'get').returns(on)
    searchIngredients('foo', function(err, res, body) { })
    mock.restore()
    sinon.assert.calledOnce(mock)
  })
})
