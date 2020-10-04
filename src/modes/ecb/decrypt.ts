import type { BufferInput } from '../../utils'
import { coerceArray, copyArray } from '../../utils'
import { Block, Decryptor } from '../../block'

export const decrypt = (
  decryptor: Block | Decryptor,
  ciphertext: BufferInput,
) => {
  ciphertext = coerceArray(ciphertext)

  if (ciphertext.length % 16 !== 0) {
    throw new Error('invalid ciphertext size (must be multiple of 16 bytes)')
  }

  var plaintext = new Uint8Array(ciphertext.length)
  var block = new Uint8Array(16)

  for (var i = 0; i < ciphertext.length; i += 16) {
    copyArray(ciphertext, block, 0, i, i + 16)
    block = decryptor.decrypt(block)
    copyArray(block, plaintext, i)
  }

  return plaintext
}
