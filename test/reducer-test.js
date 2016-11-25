import {assert} from 'chai'
import reducer from '../app/reducers'
import * as types from '../app/actions'

describe('fridge reducer', () => {
  it('should add new items into fridge', () => {
    assert.deepEqual(
      reducer([],
        {
          type: types.ADD_TO_FRIDGE,
          ingredient: {name: 'foo', id:1}
        }
      ).fridge.contents,
      [
        {
          name: 'foo',
          id: 1
        }
      ]
    )
  })
  it('should delete items from fridge', () => {
    assert.deepEqual(
      reducer(
        [
          {
            name: 'foo',
            id: 1
          }
        ],
        [
          {
            type: types.DEL_FROM_FRIDGE,
            ingredient: {name: 'foo', id: 1}
          }
        ]
      ).fridge.contents, [])
  })
})
describe('recipe reducer', () => {
  it('should should get next page', () => {
    assert.equal(
      reducer(
        {
          page: 1
        },
        {
          type: types.MORE_RECIPES
        }
      ).recipes.page, 2
    )
  })
  it('should retry recipe', () => {
    assert.deepEqual(
      reducer(
        [
          {
            contents: ['foo', 'bar'],
            page: 2
          }
        ],
        {
          type: types.RETRY_RECIPES
        }
      ).recipes, { contents: [], isLoading: false, page: 1, timestamp: null}
    )
  })
  it('should request recipes', () => {
    var timestamp = (new Date()).getTime()
    assert.equal(
      reducer([],
        {
          type: types.REQUEST_RECIPES,
          timestamp: timestamp
        }
      ).recipes.timestamp, timestamp
    )
  })
  it('should recieve recipes if timestamp is the same', () => {
    var timestamp = (new Date()).getTime()
    assert.deepEqual(
      reducer(
      {recipes:
        {
        contents: [],
        page: 1,
        timestamp: timestamp,
        isLoading: true
        }
      },
      {
        type: types.RECEIVE_RECIPES,
        recipes: {name: 'foo', id: 1},
        timestamp: timestamp
      }).recipes,
      {
        contents: [{name: 'foo', id: 1}],
        page: 1,
        timestamp: timestamp,
        isLoading: false
      }
    )
  })
  it('should not update recipes if timestamp is different', () => {
    var timestamp1 = (new Date()).getTime()
    setTimeout(() => {
      var timestamp2 = (new Date()).getTime()
      assert.deepEqual(
        reducer(
        {recipes:
          {
          contents: [],
          page: 1,
          timestamp: timestamp1,
          isLoading: true
          }
        },
        {
          type: types.RECEIVE_RECIPES,
          recipes: {name: 'foo', id: 1},
          timestamp: timestamp2
        }).recipes,
        {
          contents: [],
          page: 1,
          timestamp: timestamp2,
          isLoading: true
        }
      )
    }, 1)
  })
})
describe('cooking today', () => {
  it('should add to cooking today', () => {
    assert.deepEqual(
      reducer([],
        {
          type: types.ADD_TO_COOKING_TODAY,
          recipe: {name: 'foo', id: 1}
        }
      ).cookingToday.contents,
        [
          {
            name: 'foo',
            id: 1
          }
        ]
      )
  })
  it('should toggle accordion', () => {
    assert.deepEqual(
      reducer(
        {cookingToday: {
          accordion: {isExpanded: false, index: 1}
        }},
        {
          type: types.TOGGLE_COOKING_TODAY,
          index: 1
        }
      ).cookingToday.accordion,
      {isExpanded: true, index:1}
    )
  })
  it('should clear cooking today', () => {
    assert.equal(
      reducer(
        {cookingToday: {
          contents: [{name: 'foo', id: 1}]
        }},
        {
          type: types.CLEAR_COOKING_TODAY
        }
      ).cookingToday.contents.length, 0
    )
  })
  it('should update the missing today based on fridge', () => {
    assert.deepEqual(
      reducer(
        {
          cookingToday:{
          contents: [{missedIngredients: [{id: 1}, {id: 2}]}]
          }
        },
        {
          type: types.UPDATE_MISSING_COOKING_TODAY,
          fridge: [{id: 1}]
        }
      ).cookingToday.contents, [{missedIngredients: [{id: 2}]}]
    )
  })
})
describe('userData', () => {
  it('should able to request user data', () => {
    
  })
})
