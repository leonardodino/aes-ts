import { pkcs7pad, pkcs7strip } from '..'

function bufferEqual(a, b) {
  if (a.length != b.length) return false
  for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}

function padding(test) {
  for (var size = 0; size < 100; size++) {
    // Create a random piece of data
    var data = []
    for (var i = 0; i < size; i++) data.push(42)

    // Pad it
    var padded = pkcs7pad(data)
    test.ok(padded.length % 16 === 0, 'Failed to pad to block size')
    test.ok(data.length <= padded.length && padded.length <= data.length + 16, 'Padding went awry')
    test.ok(padded[padded.length - 1] >= 1 && padded[padded.length - 1] <= 16, 'Failed to pad to block size')

    // Trim it
    var trimmed = pkcs7strip(padded)
    test.ok(bufferEqual(data, trimmed), 'Failed to trim to original data')
  }
  test.done()
}

export default { 'test-padding': padding }
