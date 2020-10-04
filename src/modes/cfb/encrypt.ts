import type { BufferInput } from '../../utils'
import { coerceArray, copyArray } from '../../utils'
import { Encryptor } from '../../block'

export const encrypt = (
  encryptor: Encryptor,
  plaintext: BufferInput,
  state: { segmentSize: number; _shiftRegister: Uint8Array },
) => {
  if (plaintext.length % state.segmentSize !== 0) {
    throw new Error('invalid plaintext size (must be segmentSize bytes)')
  }

  var encrypted = coerceArray(plaintext, true)

  var xorSegment
  for (var i = 0; i < encrypted.length; i += state.segmentSize) {
    xorSegment = encryptor.encrypt(state._shiftRegister)
    for (var j = 0; j < state.segmentSize; j++) {
      encrypted[i + j] ^= xorSegment[j]
    }

    // Shift the register
    copyArray(state._shiftRegister, state._shiftRegister, 0, state.segmentSize)
    copyArray(
      encrypted,
      state._shiftRegister,
      16 - state.segmentSize,
      i,
      i + state.segmentSize,
    )
  }

  return encrypted
}
