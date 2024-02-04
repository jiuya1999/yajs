
function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1)
}

function isArrowFunction(func) {
    const str = func.toString().replace(/\s/g, '')
    const arrow = str.indexOf('=>')
    if (arrow === -1) return false;
    const f = str.indexOf('){')
    return arrow > f;
}

function getFun(str) {
    const matches = str.match(/(\w+)\s*\(([^)]*)\)\s*{([^]*)}/);
    return new Function(matches[2], matches[3])
}
function getArrowFun(str) {
    let matches = str.match(/\((.*?)\)\s*=>\s*{([\s\S]*)}/)
    return new Function(matches[1], matches[2])
}

function setObj(obj, valueList, list, keyList) {
    let k = Object.keys(obj), cope = {};
    for (let i = k.length - 1; i>=0;i--) {
        const key = k[i]
        cope[key] = copyValue(obj[key],key , valueList, list, keyList)
    }
    let h = Object.getOwnPropertySymbols(obj)
    for (let i = h.length - 1; i>=0;i--) {
        const key = h[i].description
        keyList.push(`${list ? (list + ','): ''}${key},Symbol`)
        cope[key] = copyValue(obj[h[i]], key , valueList, list, keyList)
    }
    return cope
}

function setArray(arr, valueList, list, keyList) {
    let l = arr.length, cope = [];
    for(let i = 0;i < l;i++ ) {
        cope[i] = copyValue(arr[i], i, valueList, list, keyList )
    }
    return cope
}

function getRegExp(value) {
    return new RegExp(...value)
}

function getUndefined() {
    return undefined
}

function getSymbol(value) {
    return Symbol.for(value)
}

const typeList = ['String', 'Number', 'Null', 'Boolean']


function copyValue (value, cur, valueList, list, keyList) {
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

function getSwitch(type){
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

function string(obj) {
    const valueList = []
    const keyList = []
    const copy = copyValue(obj, '', valueList, '', keyList)
    console.log(copy,valueList, keyList, 'over')
    return JSON.stringify({
        value: copy,
        valueList,
        keyList,
        type: 'ya'
    })
}

function parse(str) {
    const v = JSON.parse(str)
    if (v.type !== 'ya') return {}
    const value = v.value
    set(value, v.valueList ?? [], (k, s, l) => {
        const key = k[k.length - 2]
        s[key] = getSwitch(k[l-1])(s[k[l - 2]])
    })
    set(value, v.keyList ?? [], (k, s) => {
        const key = k[k.length - 2]
        s[Symbol.for(key)] = s[key]
        delete s[key]
    })
    return value;
    function set(value, list, callback) {
        for (let listIndex = list.length - 1; listIndex >= 0;listIndex--) {
            let val = value, keyList = list[listIndex].split(','), keyListLength = keyList.length
            for (let j = 0; j <= keyListLength - 3; j++) val = val[keyList[j]]
            callback(keyList, val, keyListLength)
        }
    }
}

window.ya = {
    string,
    parse
}