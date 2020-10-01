import { Counter, ecb, cbc, cfb, ofb, ctr } from '..'

const modes = { ecb, cbc, cfb, ofb, ctr }

const bufferEquals = (a, b) => {
  if (a.length != b.length) return false
  for (var i = 0; i < a.length; i++) {
    if (a[i] != b[i]) return false
  }
  return true
}

const makeTest = (options) => {
  var modeOfOperation = options.modeOfOperation
  var mo = modes[modeOfOperation]

  var plaintext = []
  for (var i = 0; i < options.plaintext.length; i++) {
    plaintext.push(Uint8Array.from(options.plaintext[i]))
  }

  var key = Uint8Array.from(options.key)

  var iv = null
  if (options.iv) {
    iv = Uint8Array.from(options.iv)
  }

  var segmentSize = 0
  if (options.segmentSize) {
    segmentSize = options.segmentSize
  }

  var ciphertext = []
  for (var i = 0; i < options.encrypted.length; i++) {
    ciphertext.push(Uint8Array.from(options.encrypted[i]))
  }

  return (test) => {
    var func
    switch (modeOfOperation) {
      case 'ecb':
        func = () => new mo(key)
        break
      case 'cfb':
        func = () => new mo(key, iv, segmentSize)
        break
      case 'ofb':
      case 'cbc':
        func = () => new mo(key, iv)
        break
      case 'ctr':
        func = () => new mo(key, new Counter(0))
        break
      default:
        throw new Error('unknwon mode of operation')
    }

    var encrypter = func(),
      decrypter = func()
    for (var i = 0; i < plaintext.length; i++) {
      var ciphertext2 = encrypter.encrypt(plaintext[i])
      test.ok(bufferEquals(ciphertext2, ciphertext[i]), 'encrypt failed to match test vector')

      var plaintext2 = decrypter.decrypt(ciphertext2)
      test.ok(bufferEquals(plaintext2, plaintext[i]), 'decrypt failed to match original text')
    }

    test.done()
  }
}

const testVectors = require('./test-vectors.json')

const Tests = {}
const counts = {}
for (var i = 0; i < testVectors.length; i++) {
  var test = testVectors[i]
  var name = test.modeOfOperation + '-' + test.key.length
  counts[name] = (counts[name] || 0) + 1
  Tests['test-' + name + '-' + counts[name]] = makeTest(test)
}

export default Tests
