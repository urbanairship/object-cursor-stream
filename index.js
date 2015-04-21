/**
 * Copyright 2015 Urban Airship and Contributors
 */
var dotpath = require('dotpath-stream')
  , dedupe = require('dedupe-stream')
  , duplex = require('duplexer')

module.exports = cursor

function cursor(path, fallback) {
  var pathStream = dotpath(path, fallback)

  return duplex(pathStream, pathStream.pipe(dedupe()))
}
