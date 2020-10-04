import type { BufferInput } from '../../utils'
import { Block, Encryptor } from '../../block'
import { ModeOfOperationCFB } from './base'
import { encrypt } from './encrypt'
import { decrypt } from './decrypt'

export class CFBEncryptor extends ModeOfOperationCFB<Encryptor> {
  constructor(key: BufferInput, iv: BufferInput, segmentSize: number) {
    super(new Encryptor(key), iv, segmentSize)
  }
  encrypt(plaintext: BufferInput) {
    return encrypt(this._aes, plaintext, this)
  }
}

export class CFBDecryptor extends ModeOfOperationCFB<Encryptor> {
  constructor(key: BufferInput, iv: BufferInput, segmentSize: number) {
    super(new Encryptor(key), iv, segmentSize)
  }
  decrypt(ciphertext: BufferInput) {
    return decrypt(this._aes, ciphertext, this)
  }
}

export class CFB extends ModeOfOperationCFB<Block> {
  constructor(key: BufferInput, iv: BufferInput, segmentSize: number) {
    super(new Block(key), iv, segmentSize)
  }
  encrypt(plaintext: BufferInput) {
    return encrypt(this._aes, plaintext, this)
  }
  decrypt(ciphertext: BufferInput) {
    return decrypt(this._aes, ciphertext, this)
  }
}
