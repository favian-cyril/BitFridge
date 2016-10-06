import sinon from "sinon"
import {mount, shallow} from 'enzyme'
import {assert} from 'chai'
import React from 'react'

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView
describe('card', function() {
  it('should have a title', function() {

    })
  it("should change the state when setting is called", function(){

  })
  it("should show the contents", function(){

  })

})
