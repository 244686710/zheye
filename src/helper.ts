interface CheckCondition {
  format?: string[];
  size?: number;
}

type ErrorType = 'size' | 'format' | null
export function beforUploadCheck (file: File, condition: CheckCondition) {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? (file.size / 1024 / 1024 < size) : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }

  return {
    passed: isValidSize && isValidFormat,
    error
  }
}

export const arrToObj = <T extends {_id?: string}>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T})
}
interface TestProps {
  _id: string;
  name: string;
}
const testData: TestProps[] = [{ _id: 'first', name: 'a' }, { _id: 'second', name: 'b' }]

const result = arrToObj(testData)
console.log({ result })

export const objToArr = <T>(obj: { [key: string]: T }) => {
  return Object.keys(obj).map(key => obj[key])
}

const testData2: { [key: string]: TestProps } = {
  1: { _id: '1', name: 'a' },
  2: { _id: '2', name: 'b' }
}

const result2 = objToArr(testData2)
console.log({ result2 })
