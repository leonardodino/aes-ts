import { Counter, ECB, CBC, OFB, CFB } from '..'

const newBuffer = (length) => new Uint8Array(length).fill(42)

// Invalid key sizes to try
const keySizes = [0, 1, 2, 7, 8, 9, 15, 17, 23, 25, 31, 33, 100]

export default {
  'test-errors-key-size': (test) => {
    for (var i = 0; i < keySizes.length; i++) {
      test.throws(
        () => {
          var moo = new ECB(newBuffer(keySizes[i]))
        },
        function (error) {
          return error.message === 'invalid key size (must be 16, 24 or 32 bytes)'
        },
        'invalid key size failed to throw an error',
      )
    }

    test.done()
  },

  'test-errors-iv-missing': (test) => {
    var ivSizes = [0, 15, 17, 100]
    for (var i = 0; i < 3; i++) {
      var keySize = 16 + i * 8

      for (var j = 0; j < ivSizes.length; j++) {
        test.throws(
          () => {
            var moo = new CBC(newBuffer(keySize))
          },
          function (error) {
            return error.message === 'IV is required!'
          },
          'missing iv for cbc failed to throw an error',
        )

        test.throws(
          () => {
            var moo = new OFB(newBuffer(keySize))
          },
          function (error) {
            return error.message === 'IV is required!'
          },
          'missing iv for ofb failed to throw an error',
        )
      }
    }

    test.done()
  },

  'test-errors-iv-size': (test) => {
    var ivSizes = [0, 15, 17, 100]
    for (var i = 0; i < 3; i++) {
      var keySize = 16 + i * 8

      for (var j = 0; j < ivSizes.length; j++) {
        test.throws(
          () => {
            var moo = new CBC(newBuffer(keySize), newBuffer(ivSizes[j]))
          },
          function (error) {
            return error.message === 'invalid iv size (must be 16 bytes)'
          },
          'invalid iv size for cbc failed to throw an error',
        )

        test.throws(
          () => {
            var moo = new OFB(newBuffer(keySize), newBuffer(ivSizes[j]))
          },
          function (error) {
            return error.message === 'invalid iv size (must be 16 bytes)'
          },
          'invalid iv size for ofb failed to throw an error',
        )
      }
    }

    test.done()
  },

  'test-errors-segment-size': (test) => {
    var key = newBuffer(16)
    var iv = newBuffer(16)
    for (var i = 1; i < 17; i++) {
      for (var j = 1; j < 17; j++) {
        if (j % i === 0) {
          continue
        }

        var moo = new CFB(key, iv, i)

        test.throws(
          () => {
            moo.encrypt(newBuffer(j))
          },
          function (error) {
            return error.message === 'invalid plaintext size (must be segmentSize bytes)'
          },
          'invalid plaintext (invalid segment size) failed to throw an error ' + i + ' ' + j,
        )
      }
    }

    test.done()
  },

  'test-errors-text-size': (test) => {
    var textSizes = [1, 2, 15, 17, 31, 33]

    for (var i = 0; i < 3; i++) {
      var key = newBuffer(16 + i * 8)
      for (var j = 0; j < textSizes.length; j++) {
        for (var k = 0; k < 2; k++) {
          var text = newBuffer(textSizes[j])
          if (k === 0) {
            var moo = new ECB(key)
          } else {
            var moo = new CBC(key, newBuffer(16))
          }

          test.throws(
            () => {
              moo.encrypt(text)
            },
            function (error) {
              return error.message === 'invalid plaintext size (must be multiple of 16 bytes)'
            },
            'invalid text size failed to throw an error',
          )
        }
      }
    }

    for (var i = 0; i < 3; i++) {
      var key = newBuffer(16 + i * 8)
      for (var j = 0; j < textSizes.length; j++) {
        for (var k = 0; k < 2; k++) {
          var text = newBuffer(textSizes[j])
          if (k === 0) {
            var moo = new ECB(key)
          } else {
            var moo = new CBC(key, newBuffer(16))
          }

          test.throws(
            () => {
              moo.decrypt(text)
            },
            function (error) {
              return error.message === 'invalid ciphertext size (must be multiple of 16 bytes)'
            },
            'invalid text size failed to throw an error',
          )
        }
      }
    }

    test.done()
  },

  'test-errors-counter': (test) => {
    var textSizes = [0, 1, 2, 15, 17]
    for (var i = 0; i < textSizes.length; i++) {
      test.throws(
        () => {
          var counter = new Counter(newBuffer(textSizes[i]))
        },
        function (error) {
          return error.message === 'invalid counter bytes size (must be 16 bytes)'
        },
        'invalid counter size (bytes.length != 16) failed to throw an error',
      )

      var counter = new Counter()
      test.throws(
        () => {
          counter.setBytes(newBuffer(textSizes[i]))
        },
        function (error) {
          return error.message === 'invalid counter bytes size (must be 16 bytes)'
        },
        'invalid counter setBytes (bytes.length != 16) failed to throw an error',
      )

      var counter = new Counter()
      test.throws(
        () => {
          counter.setValue(newBuffer(textSizes[i]))
        },
        function (error) {
          return error.message === 'invalid counter value (must be an integer)'
        },
        'invalid counter setValue (Array) failed to throw an error',
      )
    }

    test.throws(
      () => {
        var counter = new Counter(1.5)
      },
      function (error) {
        return error.message === 'invalid counter value (must be an integer)'
      },
      'invalid counter value (non-integer number) failed to throw an error',
    )

    var counter = new Counter()
    test.throws(
      () => {
        counter.setValue(1.5)
      },
      function (error) {
        return error.message === 'invalid counter value (must be an integer)'
      },
      'invalid counter setValue (non-integer number) failed to throw an error',
    )

    test.throws(
      () => {
        var counter = new Counter(Number.MAX_SAFE_INTEGER + 1)
      },
      function (error) {
        return error.message === 'integer value out of safe range'
      },
      'invalid counter value (out of range) failed to throw an error',
    )

    var badThings = [0, 1.5, 1]
    for (var i = 0; i < badThings.length; i++) {
      var counter = new Counter()
      test.throws(
        () => {
          counter.setBytes(badThings[i])
        },
        function (error) {
          return error.message === 'unsupported array-like object'
        },
        'invalid counter setBytes (numbers) failed to throw an error',
      )
    }

    var badThings = [1.5, 'foobar', {}]
    for (var i = 0; i < badThings.length; i++) {
      var counter = new Counter()
      test.throws(
        () => {
          counter.setBytes(badThings[i])
        },
        function (error) {
          return error.message === 'unsupported array-like object'
        },
        'invalid counter setBytes (' + badThings[i] + ') failed to throw an error',
      )

      var counter = new Counter()
      test.throws(
        () => {
          counter.setValue(badThings[i])
        },
        function (error) {
          return error.message === 'invalid counter value (must be an integer)'
        },
        'invalid counter setValue (' + badThings[i] + ') failed to throw an error',
      )
    }

    test.done()
  },
}
