'use strict'

// buffer-equal-constant-time 1.0.1 still reads SlowBuffer during import.
// Node.js 26 removed that deprecated alias; the package only needs its
// prototype, which is identical to Buffer's for this use.
const buffer = require('buffer')
if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = buffer.Buffer
}
