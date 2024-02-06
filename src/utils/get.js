
export function getFun(str) {
    const matches = str.match(/(\w+)\s*\(([^)]*)\)\s*{([^]*)}/);
    return new Function(matches[2], matches[3])
}
export function getArrowFun(str) {
    let matches = str.match(/\((.*?)\)\s*=>\s*{([\s\S]*)}/)
    return new Function(matches[1], matches[2])
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