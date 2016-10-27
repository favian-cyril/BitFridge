import { mount, shallow } from 'enzyme'
import { assert } from 'chai'
import React from 'react'
import Fridge from '../app/components/Fridge'
import IngredientSuggestion from '../app/components/IngredientSuggestion'

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView
describe('Fridge', function() {
  var content = [
    { name: 'foo', image: 'bar', id: 123 },
    { name: 'rza', image: 'gza', id: 777 }
  ]
  it('should have a title', function() {
    var input = 'foo'
    var wrapper = shallow(<Fridge title={input} contents={content}/>)
    assert.equal(input, wrapper.instance().props.title)
  })
  it("should have settings", function() {
    var settings = {}
    var wrapper = shallow(<Fridge settings={settings} contents={content}/>)
    assert.equal(true, wrapper.state('settings') instanceof Object)
  })
  it("should have content", function() {
    var wrapper = shallow(<Fridge contents={content}/>)
    assert.equal(wrapper.find(IngredientSuggestion).length, 2)
  })
})
