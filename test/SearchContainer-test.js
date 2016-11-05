import sinon from 'sinon'
import {mount, shallow, render} from 'enzyme'
import {assert} from 'chai'
import React from 'react'
import SearchContainer from '../app/containers/SearchContainer'
import MainContainer from '../app/containers/MainContainer'
import SuggestionsList from '../app/components/SuggestionList'
import Ingredient from '../app/components/Ingredient'
import SearchBar from '../app/components/SearchBar'
import Preloader from '../app/components/Preloader'
import ErrorMsg from '../app/components/Error'
import searchIngredients from '../app/clientapi'

// set up a testing environment to run like a browser in the command line
// create a fake browser and html doc
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.navigator = {
  userAgent: 'node.js'
};
global.document = doc
global.window = doc.defaultView

describe('SearchContainer', function() {
  it('should have a SearchBar', function() {
    const wrapper = shallow(
      <SearchContainer
        updateFridge={function() {}}
        isInFridge={function() {}}
      />
    )
    assert.equal(wrapper.find(SearchBar).length, 1)
  })
  it('should have a SuggestionsList', function() {
    const wrapper = shallow(
      <SearchContainer
        updateFridge={function() {}}
        isInFridge={function() {}}
      />
    )
    assert.equal(wrapper.find(SuggestionsList).length, 1)
  })
})
describe('SearchBar', function() {
  it('should have an input form', function() {
    const wrapper = shallow(
      <SearchBar
        handleInput={function() {}}
        handleToggleFocus={function() {}}
      />
    )
    assert.equal(wrapper.find('input').length, 1)
  })
})
describe('SuggestionsList', function() {
  const mockResults = [
    { name: 'foo', image: 'foo' },
    { name: 'bar', image: 'bar' }
  ]
  it('should show SuggestionsList when parsed a text', sinon.test(function() {
    const input = 'foo'
    const mock = this.stub(searchIngredients, "searchIngredients").returns(null, 200, input)
    const wrapper = mount(
      <SuggestionsList
        searchText={input}
        isFocused={true}
        isLoading={false}
        suggestionResults={mockResults}
        updateFridge={function() {}}
        isInFridge={function() {}}
      />
    )
    setTimeout(() => { assert.equal(wrapper.find(IngredientSuggestion).length, 1) }, 1)
  }))
  it('should show Preloader', sinon.test(function() {
    const input = 'foo'
    const mock = this.stub(searchIngredients, "searchIngredients").returns(null, 200, input)
    const wrapper = mount(
      <SuggestionsList
        searchText={input}
        isFocused={true}
        isLoading={false}
        suggestionResults={mockResults}
        updateFridge={function() {}}
        isInFridge={function() {}}
      />
    )
    setTimeout(() => { assert.equal(wrapper.find(Preloader).length, 1) }, 1)
  }))
  it('should show ErrorMsg', sinon.test(function() {
    const input = 'foo'
    const mock = this.stub(searchIngredients, "searchIngredients").returns('TypeError', 200, input)
    const wrapper = mount(
      <SuggestionsList
        searchText={input}
        isFocused={true}
        isLoading={false}
        suggestionResults={mockResults}
        updateFridge={function() {}}
        isInFridge={function() {}}
      />
    )
    setTimeout(() => { assert.equal(wrapper.find(ErrorMsg).length, 1) }, 1)
  }))
})
describe('IngredientSuggestion', function() {
  const mockItem = { name: 'foo', image: 'foo' }
  it('should show title', function() {
    const wrapper = shallow(
      <Ingredient
        ingredient={mockItem}
        isLoading={true}
        isAdded={false}
        handleToggle={function() {}}
      />
    )
    assert.equal(wrapper.contains(<p className='media-heading'>foo</p>), true)
  })
  it('should show the image', function() {
    const wrapper = shallow(
      <Ingredient
        ingredient={mockItem}
        isLoading={true}
        isAdded={false}
        handleToggle={function() {}}
      />
    )
    assert.equal(
      wrapper.contains(
        <img className='img-rounded'
             src='https://spoonacular.com/cdn/ingredients_100x100/foo'
             alt='40x40' width='40' height='40'/>
      ), true)
  })
})
