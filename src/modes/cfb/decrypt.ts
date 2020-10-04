import type { BufferInput } from '../../utils'
import { coerceArray, copyArray } from '../../utils'
import { Encryptor } from '../../block'

export const decrypt = (
  encryptor: Encryptor,
  ciphertext: BufferInput,
  state: { segmentSize: number; _shiftRegister: Uint8Array },
) => {
  if (ciphertext.length % state.segmentSize !== 0) {
    throw new Error('invalid ciphertext size (must be segmentSize bytes)')
  }

  var plaintext = coerceArray(ciphertext, true)

  var xorSegment
  for (var i = 0; i < plaintext.length; i += state.segmentSize) {
    xorSegment = encryptor.encrypt(state._shiftRegister)

    for (var j = 0; j < state.segmentSize; j++) {
      plaintext[i + j] ^= xorSegment[j]
    }

    // Shift the register
    copyArray(state._shiftRegister, state._shiftRegister, 0, state.segmentSize)
    copyArray(
      ciphertext,
      state._shiftRegister,
      16 - state.segmentSize,
      i,
      i + state.segmentSize,
    )
  }

  return plaintext
}
