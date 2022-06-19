/*
 *	生成随机数
 * @length 随机数长度
 * @index 随机数类型
 */
export function getRandom(length, index) {
  let result = [],
    str,
    arr
  switch (index) {
    case 1:
      str = '1234567890'
      break
    case 2:
      str = 'abcdefghijklmnopqrstuvwxyz'
      break
    case 3:
      str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      break
    case 4:
      str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      break
    case 5:
      str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
      break
    case 6:
      str = 'abcdefghijklmnopqrstuvwxyz1234567890'
      break
    default:
      str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
      break
  }
  str = str.split('')
  for (let i = 0; i < length; i++) {
    arr = i > 0 ? arr : str
    let index = Math.ceil(Math.random() * parseInt(arr.length - 1))
    let addStr = arr[index]
    arr.splice(index, 1)
    result.push(addStr)
  }
  return result.join('')
}
