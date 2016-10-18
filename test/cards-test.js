import sinon from "sinon"
import {mount, shallow} from 'enzyme'
import {assert} from 'chai'
import React from 'react'
import Fridge from '../app/components/Fridge'
import CardContent from '../app/components/CardContent'
import IngredientSuggestion from '../app/components/IngredientSuggestion'

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView
describe('FridgeCardContainer', function() {
  it('should have a title', function() {
    var input = 'foo'
    var wrapper = mount(<Fridge title={input}/>)
    assert.equal(input, wrapper.instance().props.title)
  })
  it("should have settings", function(){
    var settings = {}
    var wrapper = mount(<Fridge settings={settings}/>)
    assert.equal(true, wrapper.state('settings') instanceof Object)
  })
  it("should have content", function(){
    var wrapper = shallow(<Fridge contents={<CardContent />}/>)
    assert.equal(wrapper.find(CardContent).length, 1)
  })
})
describe('CardContent', function() {
  it('should show list of items', function() {
    var items = [
      {name: 'foo', image: 'bar', id: 123},
      {name: 'bar', image: 'foo', id: 321}
    ]
    var fridge = [123, 345, 567]
    var wrapper = mount(<CardContent contents={items} fridge={fridge}/>)
    assert.equal(wrapper.find(IngredientSuggestion).length, 2)
  })
})