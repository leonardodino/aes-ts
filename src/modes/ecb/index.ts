import type { BufferInput } from '../../utils'
import { Block, Encryptor, Decryptor } from '../../block'
import { ModeOfOperationECB } from './base'
import { encrypt } from './encrypt'
import { decrypt } from './decrypt'

export class ECBEncryptor extends ModeOfOperationECB<Encryptor> {
  constructor(key: BufferInput) {
    super(new Encryptor(key))
  }
  encrypt(plaintext: BufferInput) {
    return encrypt(this._aes, plaintext)
  }
}

export class ECBDecryptor extends ModeOfOperationECB<Decryptor> {
  constructor(key: BufferInput) {
    super(new Decryptor(key))
  }
  decrypt(ciphertext: BufferInput) {
    return decrypt(this._aes, ciphertext)
  }
}

export class ECB extends ModeOfOperationECB<Block> {
  constructor(key: BufferInput) {
    super(new Block(key))
  }
  encrypt(plaintext: BufferInput) {
    return encrypt(this._aes, plaintext)
  }
  decrypt(ciphertext: BufferInput) {
    return decrypt(this._aes, ciphertext)
  }
}
