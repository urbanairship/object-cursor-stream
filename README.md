# object-cursor-stream

de-duped keypath stream

## Example

```javascript
var cursorStream = require('object-cursor-stream')

var cursor = cursorStream('pokemon.name')

cursor.write({pokemon: {type: 'chansey', name: 'Dr. Chansey'}}) // 'Dr. Chansey'
cursor.write({pokemon: {type: 'pikachu', name: 'Dr. Chansey'}}) // *nothing emitted*
cursor.write({pokemon: {type: 'pikachu', name: 'Prof. Oak'}}) // 'Prof. Oak'
cursor.write({pokemon: {type: 'pikachu'}}) // undefined

var cursor2 = cursorStream('pokemon.name', 'Spike')

cursor2.write({pokemon: {type: 'chansey', name: 'Dr. Chansey'}}) // 'Dr. Chansey'
cursor2.write({pokemon: {type: 'pikachu', name: 'Dr. Chansey'}}) // *nothing emitted*
cursor2.write({pokemon: {type: 'pikachu', name: 'Prof. Oak'}}) // 'Prof. Oak'
cursor2.write({pokemon: {type: 'pikachu'}}) // 'Spike'
```

## API

`cursorStream(keypath[, fallback]) -> DuplexStream`

* `keypath` is a string representing a path to the data you want from the
  written data.
* `fallback` is an optional argument that will be emitted if the data at
  `keypath` is `undefined`.

## License

This project is licensed under the Apache License, Version 2.0. See
[LICENSE][license] for the full license.

[license]: ./LICENSE
