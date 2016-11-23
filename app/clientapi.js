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

function fetchUser() {
  const url = `${baseUrl}user/data`
  return get(url)
}

function syncUser(user) {
  const url = `${baseUrl}user/sync`
  return post(url, user)
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
  fetchUser,
  syncUser
}
