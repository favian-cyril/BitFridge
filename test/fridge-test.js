import sinon from 'sinon'
import {assert} from 'chai'
import {addIngredient, delIngredient, getFridge}  from '../modules/fridge'
import models from '../models'

describe('addIngredient()', function(){
  const req = {
    session: {
      user: {
        id: 1,
        fridge: []
      }
    },
    body: {
      item: {
        id: 123,
        name: 'apple'
      }
    }
  }
  const user = sinon.mock(models, 'user')
  const sandbox = sinon.sandbox.create()
  it('should add items to the fridge if it is not present', function() {
    req.body.item = {id: 1, name: 'foo'}
    const update = sandbox.stub(models.user, 'update')
    const findOne = sandbox.stub(models.user, 'findOne')
    update.callsArgWith(2, [null])
    findOne.callsArgWith(1, [null, user])
    addIngredient(req, function() {
      assert.equal(req.session.user.fridge[0], req.body.item)
    })
    sandbox.restore()
  })
  it('should not add if there is duplicate items', function() {
    req.session.user.fridge = [{id:1, name:'foo'}]
    req.body.item = {id: 1, name: 'foo'}
    const update = sandbox.stub(models.user, 'update')
    const findOne = sandbox.stub(models.user, 'findOne')
    update.callsArgWith(2, [new Error])
    findOne.callsArgWith(1, [null, user])
    addIngredient(req, function(err){})
    assert.equal(req.session.user.fridge.length, 1)
    sandbox.restore()
  })
  it('should throw error if session key is missing', function() {
    req.session.user.id = null
    const update = sinon.stub(models.user, 'update')
    const findOne = sinon.stub(models.user, 'findOne')
    addIngredient(req, function(err){})
    assert.throws(addIngredient)
    update.restore()
    findOne.restore()
  })
})
describe('delIngredient()', function() {
  const req = {
    session: {
      user: {
        id: 1,
        fridge: []
      }
    },
    body: {
      item: {
        id: null,
        name: null
      }
    }
  }
  const user = sinon.stub(models, 'user')
  const sandbox = sinon.sandbox.create()
  it('should delete ingredient', function() {
    req.session.user.fridge = [{id:1, name:'foo'}]
    req.body.item = {id: 1, name: 'foo'}
    const update = sandbox.stub(models.user, 'update')
    const findOne = sandbox.stub(models.user, 'findOne')
    update.callsArgWith(2, [null])
    findOne.callsArgWith(1, [null, user])
    delIngredient(req, function(){
    })
    assert.equal(req.session.user.fridge.length, 0)
    sandbox.restore()
  })
  it('should throw error if ingredient doesnt exist', function() {
    req.session.user.fridge = [{id:1, name:'foo'}]
    req.body.item = {id: 2, name: 'foo'}
    const update = sandbox.stub(models.user, 'update')
    const findOne = sandbox.stub(models.user, 'findOne')
    update.callsArgWith(2, [new Error])
    findOne.callsArgWith(1, [null, user])
    delIngredient(req, function(){})
    assert.equal(req.session.user.fridge.length, 1)
    sandbox.restore()
  })
  it('should throw error if session key is missing', function() {
    req.session.user.id = null
    const update = sinon.stub(models.user, 'update')
    const findOne = sinon.stub(models.user, 'findOne')
    delIngredient(req, function(err){})
    assert.throws(delIngredient)
    update.restore()
    findOne.restore()
  })
})
describe('getFridge', function() {
  var req = {
    session: {
      user: {
        id: 1,
        fridge: []
      }
    }
  }
  it('should return with an empty fridge when fridge is undefined', function() {
    getFridge(req, function(err, body) {
      assert.equal(body.length, 0)
    })
  })
  it('should throw error when session id is not present', function() {
    req.session.user.id = null
    getFridge(req, function(err, body) {
      assert.throws(getFridge)
    })
  })
  it('should convert item id to int', function() {
    var req = {
      session: {
        user: {
          id: 1,
          fridge: [{id: '1'}, {id: '21'}]
        }
      }
    }
    getFridge(req, function(err, body) {
      assert.equal(body[0].id, 1)
      assert.equal(body[1].id, 21)
    })
  })
})
