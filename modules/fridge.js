function addIngredient(req, cb) {
  if (req.session.key) {
    var id = req.body.item.id
    if (req.session.fridge == undefined)
      req.session.fridge = []
    if (!(req.session.fridge.includes(id))) {
      req.session.fridge.push(id)
      cb(null)
    } else {
      cb(new Error('Duplicate item added.'))
    }
  } else {
    cb(new Error('Session key lookup failed.'))
  }
}

function delIngredient(req, cb) {
  if (req.session.key) {
    var id = req.body.item.id.toString()
    var index = req.session.fridge.indexOf(id)
    if (index > -1) {
      req.session.fridge.splice(index, 1)
      cb(null)
    }
    else {
      cb(new Error('Item not found.'))
    }
  } else {
    cb(new Error('Session key lookup failed.'))
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
