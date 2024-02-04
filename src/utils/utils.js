export function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1)
}

export function isArrowFunction(func) {
    const str = func.toString().replace(/\s/g, '')
    const arrow = str.indexOf('=>')
    if (arrow === -1) return false;
    const f = str.indexOf('){')
    return arrow > f;
}