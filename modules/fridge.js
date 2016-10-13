var Guest = sequelize.import("../models/guest")

function addIngredient(req, cb) {
  if (req.session.key) {
    var item = req.body.item
    if (req.session.fridge == undefined)
      req.session.fridge = []
    req.session.fridge.push(item.id)
    if (Guest.findById(id:item.id) == undefined){
      Guest.create(id:item.id,fridge:req.session.fridge)
    } else {
      Guest.update({fridge:req.session.fridge}, {where:{id:item.id}})
    }
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
    Guest.update({fridge:req.session.fridge}, {where:{id:item.id}})
    cb(null)
  } else {
    var err = new Error('Session key lookup failed.')
    cb(err)
  }
}

module.exports = {
  addIngredient: addIngredient
}
