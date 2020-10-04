export type BufferInput = Uint8Array | number[]

const checkInt = (value: any) => parseInt(value) === value

const checkInts = (arrayish: any): arrayish is number[] => {
  if (!checkInt(arrayish.length)) return false

  for (let i = 0; i < arrayish.length; i++) {
    if (!checkInt(arrayish[i])) return false
    if (arrayish[i] < 0 || arrayish[i] > 255) return false
  }

  return true
}

const isUint8Array = (arg: any): arg is Uint8Array => {
  if (!arg || typeof arg !== 'object') return false
  if (arg[Symbol.toStringTag] === 'Uint8Array') return true
  if (arg instanceof Uint8Array) return true
  return false
}

export const coerceArray = (arg: unknown, copy?: boolean): Uint8Array => {
  // ArrayBuffer view
  if (isUint8Array(arg)) return copy ? arg.slice() : arg

  // It's an array-like; check it is a valid representation of a byte
  if (
    Array.isArray(arg) ||
    (arg && typeof arg === 'object' && 'length' in arg)
  ) {
    if (!checkInts(arg)) throw new Error('Array contains invalid value: ' + arg)
    return new Uint8Array(arg)
  }

  throw new Error('unsupported array-like object')
}

export const copyArray = (
  sourceArray: BufferInput,
  targetArray: Uint8Array,
  targetStart?: number,
  sourceStart?: number,
  sourceEnd?: number,
) => {
  if (sourceStart != null || sourceEnd != null) {
    sourceArray = sourceArray.slice(sourceStart, sourceEnd)
  }
  targetArray.set(sourceArray, targetStart)
}

export const convertToInt32 = (bytes: number[] | Uint8Array): number[] => {
  const result = []
  for (let i = 0; i < bytes.length; i += 4) {
    result.push(
      (bytes[i] << 24) |
        (bytes[i + 1] << 16) |
        (bytes[i + 2] << 8) |
        bytes[i + 3],
    )
  }
  return result
}
