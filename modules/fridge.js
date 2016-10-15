var models  = require('../models')

function addIngredient(req, cb) {
  if (req.session.key) {
    var item = req.body.item
    if (req.session.fridge == undefined)
      req.session.fridge = []
    req.session.fridge.push(item.id)
    models.guest.findById(req.session.id).then(function(guest) {
      if (guest == null) {
      models.guest.create({id:req.session.id,fridge:JSON.stringify(req.session.fridge)})
      } else {
      models.guest.update({fridge:JSON.stringify(req.session.fridge)}, {where:{id:req.session.id}})
      }
    })
    cb(null)
  } else {
    var err = new Error('Session key lookup failed.')
    cb(err)
  }
}
function delIngredient(req, cb) {
  if (req.session.key) {
    var id = req.body.id
    delete req.session.fridge[id]
    models.guest.update({fridge:JSON.stringify(req.session.fridge)}, {where:{id:req.session.id}})
    cb(null)
  } else {
    var err = new Error('Session key lookup failed.')
    cb(err)
  }
}

module.exports = {
  addIngredient: addIngredient
}
