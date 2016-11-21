import React from 'react'
import sinon from 'sinon'
import {mount, shallow} from 'enzyme'
import {assert} from 'chai'
import Recipe from '../app/components/Recipe'
import Preloader from '../app/components/Preloader'
import Error from '../app/components/Error'
import RecipeResults from '../app/components/RecipeResults'

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.navigator = {
  userAgent: 'node.js'
};
global.document = doc
global.window = doc.defaultView

describe('Recipe', function() {
  var recipe = {title: 'foo', image: 'fooimage', sourceUrl: 'sourceUrl',
   missedIngredients: [{name:'foo'}, {name: 'bar'}]}
   var wrapper = shallow(
     <Recipe
       recipe = {recipe}
     />
   )
  it('should display title', function() {
    assert.equal(wrapper.contains(<h5 className="media-heading">foo</h5>), true)
  })
  it('should display image', function() {
    assert.equal(wrapper.contains(
      <img className="img-rounded"
      src={recipe.image}
      alt={recipe.title} width="90" height="90"/>), true)
  })
  it('should display sourceUrl', function() {
    assert.equal(wrapper.contains(
      <a
        className="btn btn-block btn-lg btn-info"
        href={recipe.sourceUrl}
        target="_blank" rel="noopener noreferrer"
      >
        <span className="fa fa-arrow-right"></span>
      </a>
    ), true)
  })
  it('should contain missing ingredient less than 4', function() {
    assert.equal(wrapper.contains(
      <small className="missing-str">Missing: {'foo, bar'}</small>), true)
  })
  it('should contain missing ingredient more than 4', function() {
    var newrecipe = {title: 'foo', image: 'fooimage', sourceUrl: 'sourceUrl',
     missedIngredients: [{name:'foo'}, {name: 'bar'}, {name: 'baz'}, {name: 'far'}, {name: 'boo'}]}
    var newwrapper = shallow(
      <Recipe
        recipe = {newrecipe}
      />
    )
    assert.equal(newwrapper.contains(<small className="missing-str">Missing: {'foo, bar, baz, far +1 more'}</small>), true)
  })
})
describe('RecipeResults', function() {
  it('should show Preloader', function() {
    const context = {
      recipes: [
        {
          title: 'foo',
          image: 'bar',
          sourceUrl: 'baz',
          missedIngredients: []
        }
      ]
    }
    var wrapper = shallow(
      <RecipeResults
        moreRecipes = {() => {}}
        retryRecipes = {() => {}}
        isLoading = {true}
        errorType = {''}
      />
    , { context })
    assert.equal(wrapper.find(Preloader).length, 1)
  })
  it('should show Recipes', function() {
    const context = {
      recipes: [
        {
          title: 'foo',
          image: 'bar',
          sourceUrl: 'baz',
          missedIngredients: []
        }
      ]
    }
    var wrapper = shallow(
      <RecipeResults
        moreRecipes = {() => {}}
        retryRecipes = {() => {}}
        isLoading = {false}
        errorType = {''}
      />
    , { context })
    assert.equal(wrapper.find(Recipe).length, 1)
  })
  it('should show error when offline', function() {
    const context = {
      recipes: [
        {
          title: 'foo',
          image: 'bar',
          sourceUrl: 'baz',
          missedIngredients: []
        }
      ]
    }
    var wrapper = shallow(
      <RecipeResults
        moreRecipes = {() => {}}
        retryRecipes = {() => {}}
        isLoading = {false}
        errorType = {'OFFLINE'}
      />
    , { context })
    assert.equal(wrapper.contains(
      <Error
        msg="Network Connection Error"
        desc="Check your internet connection and try again."
      />), true)
  })
  it('should show error when SERVERERR', function() {
    const context = {
      recipes: [
        { 
          title: 'foo',
          image: 'bar',
          sourceUrl: 'baz',
          missedIngredients: []
        }
      ]
    }
    var wrapper = shallow(
      <RecipeResults
        moreRecipes = {() => {}}
        retryRecipes = {() => {}}
        isLoading = {false}
        errorType = {'SERVERERR'}
      />
    , { context })
    assert.equal(wrapper.contains(
      <Error
        msg="Server Error"
        desc="The server is having problems, please leave him alone and try again later."
      />), true)
  })
  it('should show error when empty', function() {
    const context = { recipes: [] }
    var wrapper = shallow(
      <RecipeResults
        moreRecipes = {() => {}}
        retryRecipes = {() => {}}
        isLoading = {false}
        errorType = {''}
      />
    , { context })
    assert.equal(wrapper.contains(
      <Error
        msg="No Results Found"
        desc="Sorry, there are no recipes found containing all the ingredients you want. Try removing one ingredient or two from your fridge."
      />), true)
  })
})
