import React from 'react'
import sinon from 'sinon'
import {mount, shallow} from 'enzyme'
import {assert} from 'chai'
import clientapi from '../app/clientapi'
import * as router from 'react-router'
import anims from '../app/utils/anims'
import sinonStubPromise from 'sinon-stub-promise'
import SearchContainer from '../app/containers/SearchContainer'
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

describe('MainContainer', function() {
  it('should show Preloader when not ready', function() {
    var children = {}
    var location = { pathname: '/' }
    var wrapper = shallow(
      <MainContainer
        children={children}
        location={location}
      />
    )
    wrapper.setState({ ready: false })
    assert.equal(wrapper.find(Preloader).length, 1)
  })
  it('should show the children when parsed', function() {
    var children = shallow(
      <Index
        updateFridge={ () => {} }
        isInFridge={ () => {} }
      />
    )
    var location = { pathname: '/' }
    var wrapper = shallow(
      <MainContainer
        children={children}
        location={location}
      />
    )
    wrapper.setState({ ready: true })
    setTimeout(() => { assert.equal(wrapper.find(Index).length, 1) }, 1)
  })
  it('should load fridge and searchResults when mounted', sinon.test(function() {
    var location = { pathname: '/dash' }
    var fridge = [{ id:1 }, { id:2 }]
    var recipes = [{ name: 'foo' }, { name: 'bar' }]
    var mock1 = sinon.stub(clientapi, 'getFridge').returnsPromise().resolves(fridge)
    var mock2 = sinon.stub(clientapi, 'searchResults').returnsPromise().resolves(recipes)
    var children = shallow(
      <Dashboard
        updateFridge={ () => {} }
        isInFridge={ () => {} }
        viewMore={ () => {} }
        isLoading={ false }
        errorType={{ fridge: 'foo', recipes: 'bar' }}
      />
    )
    var wrapper = mount(
      <MainContainer
        children={children}
        location={location}
      />
    )
    setTimeout(() => {
      assert.equal(wrapper.state().display, 'dash')
      assert.equal(wrapper.state().fridge.length, fridge.length)
      assert.equal(wrapper.state().recipes.length, recipes.length)
      assert.equal(wrapper.find(Dashboard).length, 1)
    }, 1)
    mock1.restore()
    mock2.restore()
  }))
  it('should change the display when the prop is changed', sinon.test(function() {
    var location = { pathname: '/dash' }
    var fridge = [{ id: 1 }]
    var recipes = [{ name: 'foo' }, { name: 'bar' }]
    var mock1 = sinon.stub(clientapi, 'getFridge').returnsPromise().resolves(fridge)
    var mock2 = sinon.stub(clientapi, 'searchResults').returnsPromise().resolves(recipes)
    var spy = sinon.stub(router.browserHistory, 'push', () => {})
    var children = shallow(
      <Dashboard
        updateFridge={() => {}}
        isInFridge={() => {}}
        viewMore={() => {}}
        isLoading={false}
        errorType={{ fridge: 'foo', recipes: 'bar' }}
      />
    )
    var wrapper = mount(
      <MainContainer
        children={children}
        location={location}
      />
    )
    var newFridge = []
    wrapper.setState({ loggedIn: true })
    wrapper.setState({ fridge: fridge })
    wrapper.setState({ fridge: newFridge })
    assert.equal(spy.calledWith('/'), true)
    mock1.restore()
    mock2.restore()
  }))
  it('should get more recipes when moreRecipes is called', sinon.test(function() {
    var moreResults = [{ id:3 }, { id:4 }]
    var mock = sinon.stub(clientapi, 'searchResults').returnsPromise().resolves(moreResults)
    var mock1 = sinon.stub(anims)
    var children = {}
    var location = {pathname:'/'}
    var wrapper = shallow(
      <MainContainer
        children={children}
        location={location}
      />
    )
    wrapper.setState({
      recipes: [
        { id: 1 },
        { id: 2 }
      ],
      fridge: [
        { name: 'foo' },
        { name: 'bar' }
      ]
    })
    var inst = wrapper.instance()
    inst.moreRecipes() 
    assert.equal(wrapper.state().recipes.length, 4)
    mock.restore()
  }))
  it('should be able to update the fridge', function() {
    var fridge = [{ id: 1 }, { id: 2 }]
    var children = {}
    var location = { pathname:'/' }
    var wrapper = shallow(
      <MainContainer
        children={children}
        location={location}
      />
    )
    wrapper.setState({ fridge: fridge })
    var inst = wrapper.instance()
    inst.updateFridge('ADD', { id: 3 })
    assert.equal(wrapper.state().fridge.length, 3)
    inst.updateFridge('DEL', { id: 2 })
    assert.equal(wrapper.state().fridge.indexOf({ id: 2 }), -1)
  })
  it('should handle error according to the component parsed', function() {
    var fridge = [{ id: 1 }, { id: 2 }]
    var children = {}
    var location = {pathname:'/'}
    var wrapper = shallow(
      <MainContainer
        children={children}
        location={location}
      />
    )
    var err1 = { message: 'Network Error' }
    var inst = wrapper.instance()
    inst.handleError(err1, 'recipes')
    assert.equal(wrapper.state().errorType.recipes, 'OFFLINE')
    var err2 = {
      response: {
        data: {
          code:'ENOTFOUND'
        }
      }
    }
    inst.handleError(err2, 'fridge')
    assert.equal(wrapper.state().errorType.fridge, 'SERVERERR')
  })
})
