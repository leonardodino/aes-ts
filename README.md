# AES-TS
[![test status](https://github.com/leonardodino/aes-ts/workflows/Test/badge.svg)](https://github.com/leonardodino/aes-ts/actions?query=branch%3Amain)
[![npm version](https://badgen.net/npm/v/aes-ts)](https://www.npmjs.com/package/aes-ts)
[![zero dependencies](https://badgen.net/badge/dependencies/none/green)](https://david-dm.org/leonardodino/aes-ts)
[![MIT License](https://badgen.net/github/license/leonardodino/aes-ts)](https://github.com/leonardodino/aes-ts/blob/main/LICENSE)

a modern port of [`AES-JS`](https://github.com/ricmoo/aes-js):

> A pure JavaScript implementation of the AES block cipher algorithm and all common modes of operation (CBC, CFB, CTR, ECB and OFB).

for proper documentation please check their [`README.md`](https://github.com/ricmoo/aes-js/blob/master/README.md).

## motivation

- enable three shaking
  - it's rare that an app will use all this modes
  - not every app needs encryption + decryption
  - only half of the constants are needed on each direction
- a good replacement for [libraries that import `crypto-browserify` on the browser](https://dominictarr.com/post/133109715357/which-js-crypto-library-should-i-use).
- built-in typescript types

## best practices

- don't roll your own crypto, especially don't touch `Block` directly.
- don't use `ECB`. don't reuse `IV`s.
- don't use this library, use [`SubtleCrypto`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto), whenever possible.

## [exports](./src/index.ts)

ESM exports, listed by [Common Mode Of Operation](http://en.wikipedia.org/wiki/Block_cipher_mode_of_operation).

| `*`     |    `Encryptor` |    `Decryptor` |
| :------ | -------------: | -------------: |
| `Block` |    `Encryptor` |    `Decryptor` |
| `CBC`   | `CBCEncryptor` | `CBCDecryptor` |
| `CFB`   | `CFBEncryptor` | `CFBDecryptor` |
| `CTR`   | `CTREncryptor` | `CTRDecryptor` |
| `ECB`   | `ECBEncryptor` | `ECBDecryptor` |
| `OFB`   | `OFBEncryptor` | `OFBDecryptor` |

## interfaces

> replace `___` for the mode of operation.
>
> each mode has unique parameters, described by their types.

#### Encryptor

```javascript
const encryptor = new ___Encryptor(key)
const ciphertext = encryptor.encrypt(plaintext)
```

#### Decryptor

```javascript
const decryptor = new ___Decryptor(key)
const plaintext = decryptor.decrypt(ciphertext)
```

#### Encryptor + Decryptor

```javascript
const mode = new ___(key)
const sametext = mode.decrypt(mode.encrypt(plaintext))
```

## license and acknowledgments
[`MIT`](https://github.com/leonardodino/aes-ts/blob/main/LICENSE)

all crypto code and tests were taken directly from [`AES-JS`](https://github.com/ricmoo/aes-js), written by [`@ricmoo`](https://github.com/ricmoo).
