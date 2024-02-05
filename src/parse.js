import {
    getArrowFun,
    getFun,
    getSymbol,
    getUndefined,
    getRegExp
} from "./utils/get";


function getSwitch(type) {
    switch (type) {
        case 'trueFunction':
            return getArrowFun;
        case 'falseFunction':
            return getFun;
        case 'RegExp':
            return getRegExp
        case 'Undefined':
            return getUndefined
        case 'Symbol':
            return getSymbol
    }
}

function set(value, list, callback) {
    for (let listIndex = list.length - 1; listIndex >= 0; listIndex--) {
        let val = value, keyList = list[listIndex].split(','), keyListLength = keyList.length
        for (let j = 0; j <= keyListLength - 3; j++) val = val[keyList[j]]
        callback(keyList, val, keyListLength)
    }
}

function get(value, keyList, num) {
    let v = value, l = keyList.length + num;
    for (let i = 0 ; i < l; i++ ) {
        v = v[keyList[i]]
    }
    return v
}

export default function parse(str) {
    const v = JSON.parse(str)
    if (v.type !== 'ya') return {}
    const value = v.value
    set(value, v.valueList ?? [], (k, s, l) => {
        const key = k[k.length - 2]
        s[key] = getSwitch(k[l - 1])(s[k[l - 2]])
    })
    set(value, v.keyList ?? [], (k, s) => {
        const key = k[k.length - 2]
        s[Symbol.for(key)] = s[key]
        delete s[key]
    })
    v.loopList.map(item => {
        const [keyList, valueList] = item.split('|').map(i => i.split(','))
        get(value, keyList, -1)[keyList.length - 1] = get(value, valueList, 0)

    })

    return value;
}