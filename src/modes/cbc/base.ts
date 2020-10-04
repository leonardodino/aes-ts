import type { BufferInput } from '../../utils'
import { coerceArray } from '../../utils'
import { Instance } from '../../block'

/**
 *  Mode Of Operation - Cipher Block Chaining (CBC)
 */
export class ModeOfOperationCBC<T extends Instance> {
  _lastCipherblock: Uint8Array
  _aes: T
  constructor(aes: T, iv: BufferInput) {
    if (!iv) throw new Error('IV is required!')
    if (iv.length !== 16) throw new Error('invalid iv size (must be 16 bytes)')

    this._lastCipherblock = coerceArray(iv, true)
    this._aes = aes
  }
}
