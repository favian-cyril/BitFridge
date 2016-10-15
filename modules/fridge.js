var Sequelize = require('sequelize')
var sequelize = new Sequelize
var Guest = sequelize.import("../models/guest")

function addIngredient(req, cb) {
  if (req.session.key) {
    var id = req.body.item.id
    if (req.session.fridge == undefined)
      req.session.fridge = []
    if (!(req.session.fridge.includes(id)))
      req.session.fridge.push(id)
    // if (Guest.findByPrimary(item.id) == undefined){
    //   Guest.create({
    //     id: item.id,
    //     fridge: req.session.fridge
    //   })
    // } else {
    //   Guest.update({
    //     fridge: req.session.fridge
    //   }, {
    //     where: { id: item.id }
    //   })
    // }
    cb(null)
  } else {
    var err = new Error('Session key lookup failed.')
    cb(err)
  }
}

function delIngredient(req, cb) {
  var err
  if (req.session.key) {
    var id = req.body.item.id.toString()
    var index = req.session.fridge.indexOf(id)
    if (index > -1)
      req.session.fridge.splice(index, 1)
    else {
      err = new Error('Item not found.')
      cb(err)
    }
    // Guest.update({
    //   fridge: req.session.fridge
    // }, {
    //   where: { id:item.id }
    // })
    cb(null)
  } else {
    err = new Error('Session key lookup failed.')
    cb(err)
  }
}

function getFridge(req, cb) {
  if (req.session.key) {
    if (req.session.fridge == undefined)
      req.session.fridge = []
    cb(null, req.session.fridge)
  } else {
    var err = new Error('Session key lookup failed.')
    cb(err)
  }
}

module.exports = {
  addIngredient: addIngredient,
  delIngredient: delIngredient,
  getFridge: getFridge
}
