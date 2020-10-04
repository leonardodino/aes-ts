import { Si, T5, T6, T7, T8 } from './constants'
import { convertToInt32 } from '../utils'

export const decrypt = (ciphertext: Uint8Array, roundKeys: number[][] = []) => {
  if (ciphertext.length !== 16) {
    throw new Error('invalid ciphertext size (must be 16 bytes)')
  }

  var rounds = roundKeys.length - 1
  var a = [0, 0, 0, 0]

  // convert plaintext to (ints ^ key)
  var t = convertToInt32(ciphertext)
  for (var i = 0; i < 4; i++) {
    t[i] ^= roundKeys[0][i]
  }

  // apply round transforms
  for (var r = 1; r < rounds; r++) {
    for (var i = 0; i < 4; i++) {
      a[i] =
        T5[(t[i] >> 24) & 0xff] ^
        T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
        T7[(t[(i + 2) % 4] >> 8) & 0xff] ^
        T8[t[(i + 1) % 4] & 0xff] ^
        roundKeys[r][i]
    }
    t = a.slice()
  }

  // the last round is special
  var result = new Uint8Array(16),
    tt
  for (var i = 0; i < 4; i++) {
    tt = roundKeys[rounds][i]
    result[4 * i] = (Si[(t[i] >> 24) & 0xff] ^ (tt >> 24)) & 0xff
    result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff
    result[4 * i + 2] = (Si[(t[(i + 2) % 4] >> 8) & 0xff] ^ (tt >> 8)) & 0xff
    result[4 * i + 3] = (Si[t[(i + 1) % 4] & 0xff] ^ tt) & 0xff
  }

  return result
}
