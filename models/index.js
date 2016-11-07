var fs = require('fs')
var path = require('path')
var env = process.env.NODE_ENV || 'development'

fs.readdirSync(__dirname).forEach(function (file) {
  if (file !== 'index.js') {
    var moduleName = file.split('.')[0]
    exports[moduleName] = require('./' + moduleName)
  }
})
