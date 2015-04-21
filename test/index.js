var test = require('tape')

var cursorStream = require('../')

test('provides section of data defined', function(t) {
  t.plan(1)

  var cursor = cursorStream('hello.kitty')

  cursor.on('data', function(data) {
    t.equal(data, 'cat')
  })

  cursor.write({hello: {kitty: 'cat'}})
})

test('allows fallback', function(t) {
  t.plan(1)

  var cursor = cursorStream('hello.kitty', 'cat')

  cursor.on('data', function(data) {
    t.equal(data, 'cat')
  })

  cursor.write({})
})

test('dedupes data', function(t) {
  t.plan(4)

  var cursor = cursorStream('hello.kitty')
    , count = 0

  cursor.on('data', function(data) {
    ++count

    if(count === 1) {
      t.equal(data, 'cat')
    }

    if(count === 2) {
      t.equal(data, 'dog')
    }

    if(count === 3) {
      t.equal(data, 'cat')
    }
  })

  cursor.write({hello: {kitty: 'cat'}})
  cursor.write({hello: {kitty: 'cat'}})
  cursor.write({hello: {kitty: 'dog'}})
  cursor.write({hello: {kitty: 'dog'}})
  cursor.write({hello: {kitty: 'cat'}})
  cursor.write({hello: {kitty: 'cat'}})

  t.equal(count, 3)
})
