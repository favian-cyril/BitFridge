import sinon from 'sinon'
import {assert} from 'chai'
import {addIngredient, delIngredient, getFridge}  from '../modules/fridge'
import models from '../models'

describe('addIngredient()', function(){
    let req = {
      session: {
        id: 1,
        fridge: undefined
      },
      body: {
        item: {
          id: null,
          name: null
        }
      }
    }
  var _ = sinon.stub(models)
  it('should add items to the fridge if it is not present', function() {
    req.body.item = {id: 1, name: 'foo'}
    addIngredient(req, function() {
      assert.equal(req.session.fridge[0], req.body.item)
    })
  })
  it('should not add if there is duplicate items', function() {
    req.session.fridge = [{id:1, name:'foo'}]
    req.body.item = {id: 1, name: 'foo'}
    addIngredient(req, function(err){})
    assert.equal(req.session.fridge.length, 1)
  })
  it('should throw error if session key is missing', function() {
    req.session.id = null
    addIngredient(req, function(err){})
    assert.throws(addIngredient)
  })
})
describe('delIngredient()', function() {
    var req = {
    session: {
      id: 1,
      fridge: undefined
    },
    body: {
      item: {
        id: null,
        name: null
      }
    }
  }
  it('should delete ingredient', function() {
    req.session.fridge = [{id:1, name:'foo'}]
    req.body.item = {id: 1, name: 'foo'}
    delIngredient(req, function(){
    })
    assert.equal(req.session.fridge.length, 0)
  })
  it('should throw error if ingredient doesnt exist', function() {
    req.session.fridge = [{id:1, name:'foo'}]
    req.body.item = {id: 2, name: 'foo'}
    delIngredient(req, function(){})
    assert.equal(req.session.fridge.length, 1)
  })
  it('should throw error if session key is missing', function() {
    req.session.id = null
    delIngredient(req, function(err){})
    assert.throws(delIngredient)
  })
})
describe('getFridge', function() {
  var req = {
    session: {
    id: 1,
    fridge: undefined
    }
  }
  it('should return with an empty fridge when fridge is undefined', function() {
    getFridge(req, function(err, body) {
      assert.equal(body.length, 0)
    })
  })
  it('should throw error when session id is not present', function() {
    req.session.id = null
    getFridge(req, function(err, body) {
      assert.throws(getFridge)
    })
  })
  it('should convert item id to int', function() {
    var req = {
      session: {
      id: 1,
      fridge: [{id: '1'}, {id: '21'}]
      }
    }
    getFridge(req, function(err, body) {
      assert.equal(body[0].id, 1)
      assert.equal(body[1].id, 21)
    })
  })
})
