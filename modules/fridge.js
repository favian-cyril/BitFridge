var models = require('../models')
var User = models.user

function addIngredient (req, cb) {
  if (req.session.user.id) {
    var item = req.body.item
    var index = -1
    req.session.user.fridge.forEach((res, i) => {
      if (item.id === res.id) {
        index = i
      }
    })
    if (index === -1) {
      req.session.user.fridge.push(item)
      User.findOne({ id: req.session.user.id }, function (err, user) {
        user.addToFridge(item, function (err) {
          if (!err) {
            cb(null)
          } else {
            cb(err)
          }
        })
      })
    } else {
      cb(null)  // no op
    }
  } else {
    cb(new Error('Session key lookup failed.'))
  }
}

function delIngredient (req, cb) {
  if (req.session.user.id) {
    var item = req.body.item
    var index = -1
    req.session.user.fridge.forEach((res, i) => {
      if (item.id === res.id) {
        index = i
      }
    })
    if (index > -1) {
      req.session.user.fridge.splice(index, 1)
      User.findOne({ id: req.session.user.id }, function (err, user) {
        user.delFromFridge(item, function (err) {
          if (!err) {
            cb(null)
          } else {
            cb(err)
          }
        })
      })
    } else {
      cb(null)  // no op
    }
  } else {
    cb(new Error('Session key lookup failed.'))
  }
}

function getFridge (req, cb) {
  if (req.session.user.id) {
    req.session.user.fridge = req.session.user.fridge.map((item) => {
      item.id = parseInt(item.id)
      return item
    })
    cb(null, req.session.user.fridge)
  } else {
    var err = new Error('Session key lookup failed.')
    cb(err)
  }
}

module.exports = {
  addIngredient,
  delIngredient,
  getFridge
}
