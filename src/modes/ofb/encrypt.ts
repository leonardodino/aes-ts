import type { BufferInput } from '../../utils'
import { coerceArray } from '../../utils'
import { Encryptor } from '../../block'

export const encrypt = (
  encryptor: Encryptor,
  plaintext: BufferInput,
  state: { _lastPrecipher: Uint8Array; _lastPrecipherIndex: number },
) => {
  const encrypted = coerceArray(plaintext, true)

  for (let i = 0; i < encrypted.length; i++) {
    if (state._lastPrecipherIndex === 16) {
      state._lastPrecipher = encryptor.encrypt(state._lastPrecipher)
      state._lastPrecipherIndex = 0
    }
    encrypted[i] ^= state._lastPrecipher[state._lastPrecipherIndex++]
  }

  return encrypted
}
