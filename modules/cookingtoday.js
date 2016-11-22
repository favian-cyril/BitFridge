var models = require('../models')
var User = models.user

function addCookToday (req, cb) {
  if (req.session.user.id) {
    var recipe = req.body.item
    if (req.session.user.cookingToday.indexOf(recipe.id) === -1) {
      req.session.user.cookingToday.push(recipe)
      User.findOne({ id: req.session.user.id }, function(err, user) {
        user.addCookToday(recipe, function(err) {
          if (!err) {
            cb(null)
          } else {
            cb(err)
          }
        })
      })
    } else {
      cb(null)
    }
  } else {
    cb(new Error('Session key lookup failed.'))
  }
}

function getCookToday (req, cb) {
  if (req.session.user.id) {
    cb(null, req.session.user.cookingToday)
  } else {
    cb(new Error('Session key lookup failed.'))
  }
}

function clearCookToday (req, cb) {
  if (req.session.user.id) {
    req.session.user.cookingToday = []
    cb(null)
    User.findOne({ id: req.session.user.id }, function(err, user) {
      user.clearCookToday(function(err) {
        if (!err) {
          cb(null)
        } else {
          cb(err)
        }
      })
    })
  }
}

module.exports = {
  addCookToday,
  getCookToday,
  clearCookToday
}
