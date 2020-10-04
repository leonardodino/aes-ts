import type { BufferInput } from '../../utils'
import { coerceArray } from '../../utils'
import { Encryptor } from '../../block'
import { Counter } from './counter'

export const encrypt = (
  encryptor: Encryptor,
  plaintext: BufferInput,
  state: {
    _counter: Counter
    _remainingCounter: null | Uint8Array
    _remainingCounterIndex: number
  },
) => {
  var encrypted = coerceArray(plaintext, true)

  for (var i = 0; i < encrypted.length; i++) {
    if (state._remainingCounterIndex === 16) {
      state._remainingCounter = encryptor.encrypt(state._counter._counter)
      state._remainingCounterIndex = 0
      state._counter.increment()
    }
    encrypted[i] ^= state._remainingCounter![state._remainingCounterIndex++]
  }

  return encrypted
}
