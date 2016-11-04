const axios = require('axios')
const append = require('append-query')
const $ = require('jquery')

// DEVELOPMENT ONLY
const baseUrl = typeof document === 'object' ? $('body').data('baseurl') : 'http://localhost:3000/api/'

function searchIngredients(string, cb) {
  const url = `${baseUrl}ingredients/autocomplete`
  const params = {
    metaInformation: true,
    number: 5,
    query: string
  }
  get(url, params, cb)
}

function searchResults(ingredients, page, cb) {
  const url = `${baseUrl}recipes/results`
  const params = {
    ingredients: JSON.stringify(ingredients),
    page
  }
  get(url, params, cb)
}

function addIngredient(ingredient, cb) {
  const url = `${baseUrl}fridge/add`
  const form = { item: ingredient }
  post(url, form, cb)
}

function delIngredient(ingredient, cb) {
  const url = `${baseUrl}fridge/del`
  const form = { item: ingredient }
  post(url, form, cb)
}

function getFridge(cb) {
  const url = `${baseUrl}fridge/get`
  get(url, null, cb)
}

function get(url, params, cb) {
  if (params) {
    url = append(url, params)
  }
  axios.get(url)
    .then((res) => {
      cb(null, res.data)
    })
    .catch((err) => {
      cb(err)
    })
}

function post(url, obj, cb) {
  const csrfToken = $("input[name='_csrf']").val()
  const options = {
    headers: { 'X-CSRF-Token': csrfToken }
  }
  axios.post(url, obj, options)
    .then(() => {
      cb(null)
    })
    .catch((err) => {
      cb(err)
    })
}

module.exports = {
  searchIngredients,
  searchResults,
  addIngredient,
  delIngredient,
  getFridge
}
