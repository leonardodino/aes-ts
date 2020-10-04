import type { BufferInput } from '../../utils'
import { Encryptor } from '../../block'
import { ModeOfOperationOFB } from './base'
import { encrypt } from './encrypt'

// OFB is symetric!

export class OFBEncryptor extends ModeOfOperationOFB<Encryptor> {
  constructor(key: BufferInput, iv: BufferInput) {
    super(new Encryptor(key), iv)
  }
  encrypt(plaintext: BufferInput) {
    return encrypt(this._aes, plaintext, this)
  }
}

export class OFBDecryptor extends ModeOfOperationOFB<Encryptor> {
  constructor(key: BufferInput, iv: BufferInput) {
    super(new Encryptor(key), iv)
  }
  decrypt(ciphertext: BufferInput) {
    return encrypt(this._aes, ciphertext, this)
  }
}

export class OFB extends ModeOfOperationOFB<Encryptor> {
  constructor(key: BufferInput, iv: BufferInput) {
    super(new Encryptor(key), iv)
  }
  encrypt(plaintext: BufferInput) {
    return encrypt(this._aes, plaintext, this)
  }
  decrypt(ciphertext: BufferInput) {
    return encrypt(this._aes, ciphertext, this)
  }
}
