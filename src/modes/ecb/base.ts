import { Instance } from '../../block'

/**
 *  Mode Of Operation - Electonic Codebook (ECB)
 */
export class ModeOfOperationECB<T extends Instance> {
  _aes: T
  constructor(aes: T) {
    this._aes = aes
  }
}
