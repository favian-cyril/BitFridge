import React from 'react'
import sinon from 'sinon'
import {mount, shallow} from 'enzyme'
import {assert} from 'chai'
import clientapi from '../app/clientapi'
import * as router from 'react-router'
import anims from '../app/utils/anims'
import sinonStubPromise from 'sinon-stub-promise'
import SearchContainer from '../app/containers/SearchContainer'
//TODO: change MainContainer to App
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
  }))
})
