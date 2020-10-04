import { coerceArray } from '../../utils'

const toInteger = (value: number): number => {
  return parseInt(value.toString(), 10)
}

/**
 *  Counter object for CTR common mode of operation
 */
export class Counter {
  // @ts-ignore
  _counter: Uint8Array

  constructor(initialValue: number | Parameters<typeof coerceArray>[0]) {
    // We allow 0, but anything false-ish uses the default 1
    if (initialValue !== 0 && !initialValue) {
      initialValue = 1
    }

    if (typeof initialValue === 'number') {
      this._counter = new Uint8Array(16)
      this.setValue(initialValue)
    } else {
      this.setBytes(initialValue)
    }
  }

  setValue(value: number | string) {
    if (typeof value !== 'number' || toInteger(value) !== value) {
      throw new Error('invalid counter value (must be an integer)')
    }

    // We cannot safely handle numbers beyond the safe range for integers
    if (value > Number.MAX_SAFE_INTEGER) {
      throw new Error('integer value out of safe range')
    }

    for (var index = 15; index >= 0; --index) {
      this._counter[index] = value % 256
      value = toInteger(value / 256)
    }
  }

  setBytes(input: Parameters<typeof coerceArray>[0]) {
    const bytes = coerceArray(input, true)

    if (bytes.length !== 16) {
      throw new Error('invalid counter bytes size (must be 16 bytes)')
    }

    this._counter = bytes
  }

  increment() {
    for (var i = 15; i >= 0; i--) {
      if (this._counter[i] === 255) {
        this._counter[i] = 0
      } else {
        this._counter[i]++
        break
      }
    }
  }
}
