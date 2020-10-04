import type { BufferInput } from '../../utils'
import { Block, Encryptor, Decryptor } from '../../block'
import { ModeOfOperationCBC } from './base'
import { encrypt } from './encrypt'
import { decrypt } from './decrypt'

export class CBCEncryptor extends ModeOfOperationCBC<Encryptor> {
  constructor(key: BufferInput, iv: BufferInput) {
    super(new Encryptor(key), iv)
  }
  encrypt(plaintext: BufferInput) {
    return encrypt(this._aes, plaintext, this)
  }
}

export class CBCDecryptor extends ModeOfOperationCBC<Decryptor> {
  constructor(key: BufferInput, iv: BufferInput) {
    super(new Decryptor(key), iv)
  }
  decrypt(ciphertext: BufferInput) {
    return decrypt(this._aes, ciphertext, this)
  }
}

export class CBC extends ModeOfOperationCBC<Block> {
  constructor(key: BufferInput, iv: BufferInput) {
    super(new Block(key), iv)
  }
  encrypt(plaintext: BufferInput) {
    return encrypt(this._aes, plaintext, this)
  }
  decrypt(ciphertext: BufferInput) {
    return decrypt(this._aes, ciphertext, this)
  }
}
