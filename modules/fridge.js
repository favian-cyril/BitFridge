var models = require('../models')

function addIngredient (req, cb) {
  if (req.session.id) {
    var item = req.body.item
    var index = -1
    if (req.session.fridge === undefined) { req.session.fridge = [] }
    req.session.fridge.forEach((res, i) => {
      if (item.id === res.id) {
        index = i
      }
    })
    if (index === -1) {
      req.session.fridge.push(item)
      console.log(req.session.id)
      models.guest.findById(req.session.id).then(function (guest) {
        if (guest === null) {
          models.guest.create({id: req.session.id, fridge: JSON.stringify(req.session.fridge)})
        } else {
          models.guest.update({fridge: JSON.stringify(req.session.fridge)}, {where: {id: req.session.id}})
        }
      })
      cb(null)
    } else {
      cb(null)  // no op
    }
  } else {
    cb(new Error('Session key lookup failed.'))
  }
}

function delIngredient (req, cb) {
  if (req.session.id) {
    var item = req.body.item
    var index = -1
    req.session.fridge.forEach((res, i) => {
      if (item.id === res.id) {
        index = i
      }
    })
    if (index > -1) {
      req.session.fridge.splice(index, 1)
      models.guest.update({fridge: JSON.stringify(req.session.fridge)}, {where: {id: req.session.id}})
      cb(null)
    } else {
      cb(null)  // no op
    }
  } else {
    cb(new Error('Session key lookup failed.'))
  }
}

function getFridge (req, cb) {
  if (req.session.id) {
    if (req.session.fridge === undefined) {
      req.session.fridge = []
    }
    req.session.fridge.map((item) => {
      item.id = parseInt(item.id)
    })
    cb(null, req.session.fridge)
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
