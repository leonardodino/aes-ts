import type { BufferInput } from '../../utils'
import { coerceArray } from '../../utils'
import { Instance } from '../../block'

/**
 *  Mode Of Operation - Cipher Feedback (CFB)
 */
export class ModeOfOperationCFB<T extends Instance> {
  segmentSize: number
  _shiftRegister: Uint8Array
  _aes: T
  constructor(aes: T, iv: BufferInput, segmentSize: number) {
    if (!iv) throw new Error('IV is required!')
    if (iv.length !== 16) throw new Error('invalid iv size (must be 16 bytes)')

    this.segmentSize = segmentSize || 1
    this._shiftRegister = coerceArray(iv, true)
    this._aes = aes
  }
}
