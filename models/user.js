var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var Schema = mongoose.Schema

var userSchema = new Schema({
  name: { type: String, default: 'Guest' },
  id: { type: String, required: true, unique: true },
  facebook: { type: Object, default: {} },
  google: { type: Object, default: {} },
  fridge: { type: Array, default: [] },
  cookingToday: { type: Array, default: [] },
  shoppingCart: { type: Array, default: [] }
})

userSchema.methods.addToFridge = function (ingredient, cb) {
  const query = { id: this.id, 'fridge.id': { '$ne': ingredient.id } }
  const update = { '$push': { 'fridge': ingredient } }
  this.constructor.update(query, update, cb)
}

userSchema.methods.syncUser = function (user, cb) {
  const update = { '$set': user }
  this.constructor.update({ id: this.id }, update, cb)
}

var User = mongoose.model('User', userSchema)

module.exports = User
