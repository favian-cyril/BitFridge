import sinon from 'sinon'
import {mount, shallow} from 'enzyme'
import {assert} from 'chai'
import React from 'react'
import SearchContainer from '../app/containers/SearchContainer'
import MainContainer from '../app/containers/MainContainer'

// set up a testing environment to run like a browser in the command line
// create a fake browser and html doc
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.navigator = {
  userAgent: 'node.js'
};
global.document = doc
global.window = doc.defaultView

describe('MainContainer', function() {
  it('should ')
})
