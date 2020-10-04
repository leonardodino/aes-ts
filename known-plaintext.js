import { ECBDecryptor } from '.'

function atob(str) {
  return Buffer.from(str, 'base64').toString('binary')
}

// input
const token = 's6VN5JjEl1044zw3Bh5MZK-AGF-fizMChYu7pG0wT84'.slice(0, 32)
const encrypted = 'f/BZ6F1ePtGpxoTyh+c9+y90X1yXTEvGWXEvTJeOhVE='

const key = new TextEncoder().encode(token)
const encryptedBytes = [...atob(encrypted)].map((a) => a.charCodeAt(0))

const instance = new ECBDecryptor(key)
const decryptedBytes = instance.decrypt(encryptedBytes)
const plaintext = new TextDecoder()
  .decode(decryptedBytes)
  .replace(/\u0010+$/, '')

console.log({
  "typeof plaintext === 'string'": typeof plaintext === 'string',
  'plaintext.length === 16': plaintext.length === 16,
  '/^d+$/.test(plaintext)': /^\d+$/.test(plaintext),
  "plaintext.endsWith('0523')": plaintext.endsWith('0523'),
})

const success =
  typeof plaintext === 'string' &&
  plaintext.length === 16 &&
  /^\d+$/.test(plaintext) &&
  plaintext.endsWith('0523')

process.exit(success ? 0 : 1)
