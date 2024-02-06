
export function getFun(str) {
    console.log(new Function(`return ${str}`))
    return new Function(`return ${str}`)()
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