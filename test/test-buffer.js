import { coerceArray as slowCreateBuffer } from '../dist/esm/utils'

const testArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const testBuffer = Uint8Array.from(testArray)

// We mimic some weird non-array-but-sortof-like-an-array object that people on
// obscure browsers seem to have problems with, for the purpose of testing our
// slowCreateBuffer.
class WeirdBuffer {
  constructor(data) {
    this.length = data.length
    for (var i = 0; i < data.length; i++) {
      this[i] = data[i]
    }
  }
}

const bufferEqual = (a, b) => {
  if (a.length != b.length) return false
  for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}

export default {
  'test-slowCreate': (test) => {
    var result = slowCreateBuffer(testArray)
    test.ok(bufferEqual(testArray, result), 'bufferCreate failed to match input array')

    result = slowCreateBuffer(testBuffer)
    test.ok(bufferEqual(testBuffer, result), 'bufferCreate failed to match input array')

    result = slowCreateBuffer(new WeirdBuffer(testArray))
    test.ok(bufferEqual(testBuffer, result), 'bufferCreate failed to match input array')

    test.done()
  },
}
