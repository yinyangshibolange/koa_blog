import { KeyValue } from '../../types'
const _toString = Object.prototype.toString;
// function isObject(src: any) {
//     return toRawType(src) === "Object";
// }
// // 区分基本数据类型和应用数据类型
// function isObjectType(src: any) {
//     return src instanceof Object;
// }
// // code from vue
// function toRawType(value: any) {
//     return _toString.call(value).slice(8, -1);
// }
//
// export const mergeKeyValue = (keyvalue: KeyValue) => {
//     const keyValueKeys = Object.keys(keyvalue);
//     keyValueKeys.forEach((key, index) => {
//         const value = keyvalue[key]
//     })
//
// }