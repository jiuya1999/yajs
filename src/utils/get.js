
export function getFun(str) {
    return new Function(str)()
}

export function getRegExp(value) {
    return new RegExp(...value)
}

export function getUndefined() {
    return undefined
}

export function getSymbol(value) {
    return Symbol.for(value)
}