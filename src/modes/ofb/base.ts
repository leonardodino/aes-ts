import type { BufferInput } from '../../utils'
import { coerceArray } from '../../utils'
import { Instance } from '../../block'

/**
 *  Mode Of Operation - Output Feedback (OFB)
 */
export class ModeOfOperationOFB<T extends Instance> {
  _lastPrecipher: Uint8Array
  _lastPrecipherIndex: number
  _aes: T
  constructor(aes: T, iv: BufferInput) {
    if (!iv) throw new Error('IV is required!')
    if (iv.length !== 16) throw new Error('invalid iv size (must be 16 bytes)')

    this._lastPrecipher = coerceArray(iv, true)
    this._lastPrecipherIndex = 16
    this._aes = aes
  }
}
