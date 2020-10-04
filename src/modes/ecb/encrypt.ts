import type { BufferInput } from '../../utils'
import { coerceArray, copyArray } from '../../utils'
import { Block, Encryptor } from '../../block'

export const encrypt = (
  encryptor: Block | Encryptor,
  plaintext: BufferInput,
) => {
  plaintext = coerceArray(plaintext)

  if (plaintext.length % 16 !== 0) {
    throw new Error('invalid plaintext size (must be multiple of 16 bytes)')
  }

  var ciphertext = new Uint8Array(plaintext.length)
  var block = new Uint8Array(16)

  for (var i = 0; i < plaintext.length; i += 16) {
    copyArray(plaintext, block, 0, i, i + 16)
    block = encryptor.encrypt(block)
    copyArray(block, ciphertext, i)
  }

  return ciphertext
}
