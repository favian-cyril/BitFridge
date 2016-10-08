import sinon from "sinon"
import {mount, shallow} from 'enzyme'
import {assert} from 'chai'
import React from 'react'
import CardContainer from '../app/containers/CardContainer'
import CardContent from '../app/components/SuggestionsList'
import IngredientList from '../app/components/IngredientList'

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView
describe('CardContainer', function() {
  it('should have a title', function() {
    var input = 'foo'
    var wrapper = mount(<CardContainer title={input} settings={null} />)
    assert.equal(input,wrapper.state('title'))
    })
  it("should have settings", function(){
    var settings = new Object()
    var wrapper = mount(<CardContainer title='foo' settings={settings} />)
    assert.equal(true,wrapper.state('settings') instanceof Object)
  })
  it("should have content", function(){
    var wrapper = shallow(<CardContainer />)
    assert.equal(wrapper.find(CardContent).length, 1)
  })
})
describe('CardContent' function() {
  it('should show list of items', function() {
    var wrapper = mount(<CardContent />)
    wrapper.setState({
      results: [('foo', 'bar'), ('foo', 'bar')]
    })
    assert.equal(wrapper.find(IngredientList).length, 2)
  })
})
