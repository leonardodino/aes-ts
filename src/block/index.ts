import { Base } from './base'
import { encrypt } from './encrypt'
import { decrypt } from './decrypt'

export type Instance = Block | Encryptor | Decryptor

export class Encryptor extends Base {
  encrypt(plaintext: Uint8Array) {
    return encrypt(plaintext, this._Ke)
  }
}

export class Decryptor extends Base {
  decrypt(ciphertext: Uint8Array) {
    return decrypt(ciphertext, this._Kd)
  }
}

export class Block extends Base {
  encrypt(plaintext: Uint8Array) {
    return encrypt(plaintext, this._Ke)
  }
  decrypt(ciphertext: Uint8Array) {
    return decrypt(ciphertext, this._Kd)
  }
}
