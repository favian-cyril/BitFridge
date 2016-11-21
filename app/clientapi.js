const axios = require('axios')

// DEVELOPMENT ONLY
const baseUrl = typeof document === 'object' ? document.body.dataset.baseurl : 'http://localhost:3000/api/'

function searchIngredients(string) {
  const url = `${baseUrl}ingredients/autocomplete`
  const params = { number: 5, query: string }
  return get(url, params)
}

function searchResults(ingredients, page) {
  const url = `${baseUrl}recipes/results`
  const params = { ingredients: JSON.stringify(ingredients), page }
  return get(url, params)
}

function addIngredient(ingredient) {
  const url = `${baseUrl}fridge/add`
  const form = { item: ingredient }
  return post(url, form)
}

function delIngredient(ingredient) {
  const url = `${baseUrl}fridge/del`
  const form = { item: ingredient }
  return post(url, form)
}

function getFridge() {
  const url = `${baseUrl}fridge/get`
  return get(url)
}

function fetchUser() {
  const url = `${baseUrl}user/data`
  return get(url)
}

function addCookToday(recipe) {
  const url = `${baseUrl}cooktoday/add`
  const form = { item: recipe }
  return post(url, form)
}

function getCookToday() {
  const url = `${baseUrl}cooktoday/get`
  return get(url)
}

function clearCookToday() {
  const url = `${baseUrl}cooktoday/clear`
  const form = { foo: 'foo'}
  return post(url, form)
}

function get(url, params) {
  const options = { params }
  return new Promise((resolve, reject) => {
    axios.get(url, options)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}

function post(url, obj) {
  const csrfToken = document.querySelector('input[name="_csrf"]').value
  const options = { headers: { 'X-CSRF-Token': csrfToken } }
  return axios.post(url, obj, options)
}

module.exports = {
  searchIngredients,
  searchResults,
  addIngredient,
  delIngredient,
  getFridge,
  fetchUser,
  addCookToday,
  getCookToday,
  clearCookToday
}
