import {getType, isArrowFunction} from "./utils/utils";

const typeList = ['String', 'Number', 'Null', 'Boolean']

export function setObj(obj, valueList, list, keyList,loopMap, loopList) {
    if (loopMap.get(obj)) {
        loopList.push(list + '|' + loopMap.get(obj))
        return loopMap.get(obj);
    }
    loopMap.set(obj, list)
    let k = Object.keys(obj), cope = {};
    for (let i = k.length - 1; i >= 0; i--) {
        const key = k[i]
        cope[key] = copyValue(obj[key], key, valueList, list, keyList,loopMap, loopList)
    }
    let h = Object.getOwnPropertySymbols(obj)
    for (let i = h.length - 1; i >= 0; i--) {
        const key = h[i].description
        keyList.push(`${list ? (list + ',') : ''}${key},Symbol`)
        cope[key] = copyValue(obj[h[i]], key, valueList, list, keyList,loopMap, loopList)
    }
    return cope
}

export function setArray(arr, valueList, list, keyList,loopMap, loopList) {
    if (loopMap.get(arr)) {
        loopList.push(list + '|' + loopMap.get(arr))
        return loopMap.get(arr);
    }
    loopMap.set(arr, list)
    let l = arr.length, cope = [];
    for (let i = 0; i < l; i++) {
        cope[i] = copyValue(arr[i], i, valueList, list, keyList,loopMap, loopList)
    }
    return cope
}

function copyValue(value, cur, valueList, list, keyList,loopMap, loopList) {
    list = list ? `${list},${cur}` : cur
    const type = getType(value)
    if (typeList.includes(type)) return value;
    switch (type) {
        case 'Object':
            return setObj(value, valueList, list, keyList,loopMap, loopList);
        case 'Array':
            return setArray(value, valueList, list, keyList,loopMap, loopList);
        case 'Function':
            valueList.push(`${list},Function`)
            return value.toString();
        case 'RegExp':
            valueList.push(`${list},RegExp`)
            return [value.source, value.flags];
        case  'Undefined':
            valueList.push(`${list},Undefined`)
            return undefined
        case  'Symbol':
            valueList.push(`${list},Symbol`)
            return value.description
    }
}


export default function string(obj) {
    console.log(100)
    const valueList = []
    const keyList = []
    const loopList = []
    const loopMap = new WeakMap()
    const copy = copyValue(obj, '', valueList, '', keyList,loopMap, loopList)
    return JSON.stringify({
        value: copy,
        valueList,
        keyList,
        loopList,
        type: 'ya'
    })
}

