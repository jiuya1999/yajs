
import {getType, isArrowFunction} from "./utils/utils";
const typeList = ['String', 'Number', 'Null', 'Boolean']

export function setObj(obj, valueList, list, keyList) {
    let k = Object.keys(obj), cope = {};
    for (let i = k.length - 1; i >= 0; i--) {
        const key = k[i]
        cope[key] = copyValue(obj[key], key, valueList, list, keyList)
    }
    let h = Object.getOwnPropertySymbols(obj)
    for (let i = h.length - 1; i >= 0; i--) {
        const key = h[i].description
        keyList.push(`${list ? (list + ',') : ''}${key},Symbol`)
        cope[key] = copyValue(obj[h[i]], key, valueList, list, keyList)
    }
    return cope
}

export function setArray(arr, valueList, list, keyList) {
    let l = arr.length, cope = [];
    for (let i = 0; i < l; i++) {
        cope[i] = copyValue(arr[i], i, valueList, list, keyList)
    }
    return cope
}

function copyValue(value, cur, valueList, list, keyList) {
    list = list ? `${list},${cur}` : cur
    const type = getType(value)
    if (typeList.includes(type)) return value;
    switch (type) {
        case 'Object':
            return setObj(value, valueList, list, keyList);
        case 'Array':
            return setArray(value, valueList, list, keyList);
        case 'Function':
            const t = isArrowFunction(value)
            valueList.push(`${list},${t}Function`)
            return value.toString();
        case 'RegExp':
            valueList.push(`${list},RegExp`)
            return /(.+)\/(.+)/.exec(value.toString().slice(1)).slice(1, 3);
        case  'Undefined':
            valueList.push(`${list},Undefined`)
            return undefined
        case  'Symbol':
            valueList.push(`${list},Symbol`)
            return value.description
    }
}



export default function string(obj) {
    const valueList = []
    const keyList = []
    const copy = copyValue(obj, '', valueList, '', keyList)
    console.log(copy, valueList, keyList, 'over')
    return JSON.stringify({
        value: copy,
        valueList,
        keyList,
        type: 'ya'
    })
}

