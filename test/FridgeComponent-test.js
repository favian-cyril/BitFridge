import { mount, shallow } from 'enzyme'
import { assert } from 'chai'
import React from 'react'
import Fridge from '../app/components/Fridge'
import IngredientContainer from '../app/containers/IngredientContainer'

// set up a testing environment to run like a browser in the command line
// create a fake browser and html doc
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.navigator = {
  userAgent: 'node.js'
};
global.document = doc
global.window = doc.defaultView
describe('Fridge', function() {
  var content = [
    { name: 'foo', id: 123 },
    { name: 'rza', id: 777 }
  ]
  var input = 'foo'
  it('should have a title', function() {
    var wrapper = shallow(
      <Fridge
        title={input}
        contents={content}
        updateFridge={function() {}}
        isInFridge={function() {}}
        />
    )
    assert.equal(input, wrapper.instance().props.title)
  })
  it("should have content", function() {
    var wrapper = shallow(
      <Fridge
        title={input}
        contents={content}
        updateFridge={function() {}}
        isInFridge={function() {}}
      />
    )
    assert.equal(wrapper.find(IngredientContainer).length, 2)
  })
})
