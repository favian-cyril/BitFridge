import sinon from 'sinon'
import assert from 'assert'
import { searchIngredients, searchResults, addIngredient, delIngredient, getFridge}  from '../app/clientapi'
import axios from 'axios'
import sinonStubPromise from 'sinon-stub-promise'

sinonStubPromise(sinon)
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.navigator = {
  userAgent: 'node.js'
};
global.document = doc
global.window = doc.defaultView

describe('clientapi', function() {
})
