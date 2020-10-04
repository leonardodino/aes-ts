import { Instance } from '../../block'
import { Counter } from './counter'

/**
 *  Mode Of Operation - Counter (CTR)
 */
export class ModeOfOperationCTR<T extends Instance> {
  _counter: Counter
  _remainingCounter: null | Uint8Array
  _remainingCounterIndex: number
  _aes: T
  constructor(aes: T, counter: Counter) {
    this._counter = counter instanceof Counter ? counter : new Counter(counter)
    this._remainingCounter = null
    this._remainingCounterIndex = 16
    this._aes = aes
  }
}
