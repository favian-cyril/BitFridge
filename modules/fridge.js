function addIngredient(req, cb) {
  if (req.session.key) {
    var item = req.body.item
    if (req.session.fridge == undefined)
      req.session.fridge = []
    req.session.fridge.push(item)
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
  } else {
    var err = new Error('Session key lookup failed.')
    cb(err)
}

module.exports = {
  addIngredient: addIngredient
}
