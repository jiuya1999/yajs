
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
    var matches = str.match(/\((.*?)\)\s*=>\s*{([\s\S]*)}/)
    return new Function(matches[1], matches[2])
}

function setObj(obj, indexList, list) {
    var k = Object.keys(obj), cope = {};
    for (var i = k.length - 1; i>=0;i--) {
        const key = k[i]
        cope[key] = copyValue(obj[key],key , indexList, list)
    }
    return cope
}

function setArray(arr, indexList, list) {
    var l = arr.length, cope = [];
    for(var i = 0;i < l;i++ ) {
        cope[i] = copyValue(arr[i], i, indexList, list )
    }
    return cope
}

function getRegExp(value) {
    return new RegExp(...value)
}

function getUndefined() {
    return undefined
}

const typeList = ['String', 'Number', 'Null', 'Boolean']


function copyValue (value, cur, indexList, list) {
    list = list ? `${list},${cur}` : cur
    const type = getType(value)
    if (typeList.includes(type)) return value;
    switch (type) {
        case 'Object':
            return setObj(value, indexList, list);
        case 'Array':
            return setArray(value, indexList, list);
        case 'Function':
            const t = isArrowFunction(value)
            indexList.push(`${list},${t}Function`)
            return value.toString();
        case 'RegExp':
            indexList.push(`${list},RegExp`)
            return /(.+)\/(.+)/.exec(value.toString().slice(1)).slice(1, 3);
        case  'Undefined':
            indexList.push(`${list},Undefined`)
            return undefined
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
    }
}

function string(obj) {
    const indexList = []
    return JSON.stringify({
        value: copyValue(obj, '', indexList, ''),
        indexList,
        type: 'ya'
    })
}

function parse(str) {
    const v = JSON.parse(str)
    if (v.type !== 'ya') return {}
    const value = v.value
    const list = v.indexList ?? []
    for (var i = list.length - 1; i >= 0;i--) {
        var s = value, k = list[i].split(','), l = k.length
        for (var j = 0; j <= l - 3; j++) {
            s = s[k[j]]
        }
        s[k[k.length - 2]] = getSwitch(k[l-1])(s[k[l - 2]])
    }
    return value;
}

window.ya = {
    string,
    parse
}