import sinon from 'sinon'
import {mount, shallow} from 'enzyme'
import {assert} from 'chai'
import React from 'react'
import SearchContainer from '../app/containers/SearchContainer'
import SuggestionsList from '../app/components/SuggestionsList'
import IngredientSuggestion from '../app/components/IngredientSuggestion'
import SearchBar from '../app/components/SearchBar'
import Preloader from '../app/components/Preloader'
import ErrorMsg from '../app/components/ErrorMsg'
import searchIngredients from '../app/clientapi'

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

describe('SearchContainer', function() {
  it('should have a SearchBar', function() {
    var wrapper = shallow(<SearchContainer />)
    assert.equal(wrapper.find(SearchBar).length, 1)
  })
  it('should have a SuggestionsList', function() {
    var wrapper = shallow(<SearchContainer />)
    assert.equal(wrapper.find(SuggestionsList).length, 1)
  })
  it('should change the state when handleInput is called', function() {
    var wrapper = shallow(<SearchContainer />)
    wrapper.instance().handleInput('foo')
    assert.equal('foo',wrapper.state('text'))
  })
  it('should change the state when handleFocus is called', function() {
    var wrapper = shallow(<SearchContainer />)
    wrapper.instance().handleFocus(true)
    assert.equal(true,wrapper.state('isFocused'))
  })
})
describe('SearchBar', function() {
  it('should have an input form', function() {
    var wrapper = shallow(<SearchBar />)
    assert.equal(wrapper.find('input').length, 1)
  })
})
describe('SuggestionsList', function() {
  it('should show SuggestionsList when parsed a text', sinon.test(function() {
    var input = 'foo'
    const mock = this.stub(searchIngredients, "searchIngredients").returns(null, 200, input)
    var wrapper = mount(<SuggestionsList />)
    wrapper.setProps({
      searchText: input,
      isFocused: true
      })
    function assertTest() {
      assert.equal(wrapper.find(IngredientSuggestion).length, 1)
    }
    setTimeout(assertTest, 1)
  }))
  it('should show Preloader', sinon.test(function() {
    var input = 'foo'
    const mock = this.stub(searchIngredients, "searchIngredients").returns(null, 200, input)
    var wrapper = mount(<SuggestionsList />)
    wrapper.setProps({
      searchText: input,
      isFocused: true
    })
    function assertTest() {
      assert.equal(wrapper.find(Preloader).length, 1)
    }
    setTimeout(assertTest, 1)
  }))
  it('should show ErrorMsg', sinon.test(function() {
    var input = 'foo'
    const mock = this.stub(searchIngredients, "searchIngredients").returns('TypeError', 200, input)
    var wrapper = mount(<SuggestionsList />)
    wrapper.setProps({
      searchText: input,
      isFocused: true
    })
    function assertTest() {
      assert.equal(wrapper.find(ErrorMsg).length, 1)
    }
    setTimeout(assertTest, 1)
  }))
})
describe('IngredientSuggestion', function() {
  var mockItem = { name: 'foo', image: 'foo' }
  it('should show title', function() {
    var wrapper = shallow(<IngredientSuggestion item={mockItem}/>)
    assert.equal(wrapper.contains(<p className='media-heading'>foo</p>), true)
  })
  it('should show the image', function() {
    var wrapper = shallow(<IngredientSuggestion item={mockItem}/>)
    assert.equal(
      wrapper.contains(
        <img className='img-rounded'
             src='https://spoonacular.com/cdn/ingredients_100x100/foo'
              alt='50x48' width='40' height='40'/>
      ), true)
  })
})
