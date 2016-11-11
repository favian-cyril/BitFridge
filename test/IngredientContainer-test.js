import React from 'react'
import sinon from 'sinon'
import {mount, shallow} from 'enzyme'
import {assert} from 'chai'
import clientapi from '../app/clientapi'
import anims from '../app/utils/anims'
import sinonStubPromise from 'sinon-stub-promise'
import SearchContainer from '../app/containers/SearchContainer'
import IngredientContainer from '../app/containers/IngredientContainer'
import MainContainer from '../app/containers/MainContainer'
import Preloader from '../app/components/Preloader'
import Index from '../app/components/Index'
import Dashboard from '../app/components/Dashboard'

// set up a testing environment to run like a browser in the command line
// create a fake browser and html doc
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.navigator = {
  userAgent: 'node.js'
};
global.document = doc
global.window = doc.defaultView
sinonStubPromise(sinon)

describe('IngredientContainer', function() {
  it('should add ingredient to the fridge', sinon.test(function() {
    var context = {
      fridge: [
        { name: 'foo' },
        { name: 'bar' },
        { name: 'baz'}
      ],
      recipes: [{}],
      display: 'dash'
    }
    var parent = 'fridge'
    var idName = '1'
    var updateFridge = () => {}
    var spy = sinon.spy(updateFridge)
    var isInFridge = () => {return false}
    var ingredient = { name: 'ping', image: 'pong' }
    var mock1 = sinon.stub(clientapi, 'addIngredient').returnsPromise().resolves()
    var wrapper = mount(
      <IngredientContainer
        parent={parent}
        idName={idName}
        updateFridge={updateFridge}
        isInFridge={isInFridge}
        ingredient={ingredient}
      />
    , { context })
    var inst = wrapper.instance()
    var mock2 = sinon.stub(inst, 'showTooltip')
    inst.handleToggle()
    assert.equal(mock2.called,true)
    mock1.restore()
    mock2.restore()
  }))
  it('should show error if failed to add', sinon.test(function () {
    var context = {
      fridge: [
        { name: 'foo' },
        { name: 'bar' },
        { name: 'baz'}
      ],
      recipes: [{}],
      display: 'dash'
    }
    var parent = 'fridge'
    var idName = '1'
    var updateFridge = () => {}
    var isInFridge = () => {return false}
    var ingredient = { name: 'ping', image: 'pong' }
    var mock1 = sinon.stub(clientapi, 'addIngredient').returnsPromise().rejects()
    var wrapper = mount(
      <IngredientContainer
        parent={parent}
        idName={idName}
        updateFridge={updateFridge}
        isInFridge={isInFridge}
        ingredient={ingredient}
      />
    , { context })
    var inst = wrapper.instance()
    var mock2 = sinon.stub(inst, 'showTooltip')
    inst.handleToggle()
    assert.equal(mock2.called,true)
    assert.equal(wrapper.state().success, false)
    mock1.restore()
    mock2.restore()
  }))
  it('should show error if failed to delete', sinon.test(function () {
    var context = {
      fridge: [
        { name: 'foo' },
        { name: 'bar' },
        { name: 'baz'}
      ],
      recipes: [{}],
      display: 'dash'
    }
    var parent = ''
    var idName = '1'
    var updateFridge = () => {}
    var isInFridge = () => {return true}
    var ingredient = { name: 'ping', image: 'pong' }
    var mock1 = sinon.stub(clientapi, 'delIngredient').returnsPromise().rejects()
    var wrapper = mount(
      <IngredientContainer
        parent={parent}
        idName={idName}
        updateFridge={updateFridge}
        isInFridge={isInFridge}
        ingredient={ingredient}
      />
    , { context })
    var inst = wrapper.instance()
    var mock2 = sinon.stub(inst, 'showTooltip')
    inst.handleToggle()
    assert.equal(mock2.called,true)
    assert.equal(wrapper.state().success, false)
    mock1.restore()
    mock2.restore()
  }))
  it('should delete ingredient if already in fridge', sinon.test(function() {
    var context = {
      fridge: [
        { name: 'foo' },
        { name: 'bar' },
        { name: 'baz'}
      ],
      recipes: [{}],
      display: 'dash'
    }
    var parent = ''
    var idName = '1'
    var updateFridge = function (a, b) {}
    var isInFridge = () => {return true}
    var ingredient = { name: 'ping', image: 'pong' }
    var mock1 = sinon.stub(clientapi, 'delIngredient').returnsPromise().resolves()
    var wrapper = mount(
      <IngredientContainer
        parent={parent}
        idName={idName}
        updateFridge={updateFridge}
        isInFridge={isInFridge}
        ingredient={ingredient}
      />
    , { context })
    var inst = wrapper.instance()
    var mock2 = sinon.stub(inst, 'showTooltip')
    inst.handleToggle()
    assert.equal(mock2.called,true)
    mock1.restore()
    mock2.restore()
  }))
})
