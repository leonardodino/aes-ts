import type { BufferInput } from '../../utils'
import { Encryptor } from '../../block'
import { Counter } from './counter'
import { ModeOfOperationCTR } from './base'
import { encrypt } from './encrypt'

// CTR is symetric!

export class CTREncryptor extends ModeOfOperationCTR<Encryptor> {
  constructor(key: BufferInput, counter: Counter) {
    super(new Encryptor(key), counter)
  }
  encrypt(plaintext: BufferInput) {
    return encrypt(this._aes, plaintext, this)
  }
}

export class CTRDecryptor extends ModeOfOperationCTR<Encryptor> {
  constructor(key: BufferInput, counter: Counter) {
    super(new Encryptor(key), counter)
  }
  decrypt(ciphertext: BufferInput) {
    return encrypt(this._aes, ciphertext, this)
  }
}

export class CTR extends ModeOfOperationCTR<Encryptor> {
  constructor(key: BufferInput, counter: Counter) {
    super(new Encryptor(key), counter)
  }
  encrypt(plaintext: BufferInput) {
    return encrypt(this._aes, plaintext, this)
  }
  decrypt(ciphertext: BufferInput) {
    return encrypt(this._aes, ciphertext, this)
  }
}
