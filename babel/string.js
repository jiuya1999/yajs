"use strict";

function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
function isArrowFunction(func) {
  var str = func.toString().replace(/\s/g, '');
  var arrow = str.indexOf('=>');
  if (arrow === -1) return false;
  var f = str.indexOf('){');
  return arrow > f;
}
function getFun(str) {
  var matches = str.match(/(\w+)\s*\(([^)]*)\)\s*{([^]*)}/);
  return new Function(matches[2], matches[3]);
}
function getArrowFun(str) {
  var matches = str.match(/\((.*?)\)\s*=>\s*{([\s\S]*)}/);
  return new Function(matches[1], matches[2]);
}
function setObj(obj, indexList, list) {
  var k = Object.keys(obj),
    cope = {};
  for (var i = k.length - 1; i >= 0; i--) {
    var key = k[i];
    cope[key] = copyValue(obj[key], key, indexList, list);
  }
  return cope;
}
function setArray(arr, indexList, list) {
  var l = arr.length,
    cope = [];
  for (var i = 0; i < l; i++) {
    cope[i] = copyValue(arr[i], i, indexList, list);
  }
  return cope;
}
function getRegExp(value) {
  return _construct(RegExp, _toConsumableArray(value));
}
function getUndefined() {
  return undefined;
}
var typeList = ['String', 'Number', 'Null', 'Boolean'];
function copyValue(value, cur, indexList, list) {
  list = list ? "".concat(list, ",").concat(cur) : cur;
  var type = getType(value);
  if (typeList.includes(type)) return value;
  switch (type) {
    case 'Object':
      return setObj(value, indexList, list);
    case 'Array':
      return setArray(value, indexList, list);
    case 'Function':
      var t = isArrowFunction(value);
      indexList.push("".concat(list, ",").concat(t, "Function"));
      return value.toString();
    case 'RegExp':
      indexList.push("".concat(list, ",RegExp"));
      return /(.+)\/(.+)/.exec(value.toString().slice(1)).slice(1, 3);
    case 'Undefined':
      indexList.push("".concat(list, ",Undefined"));
      return undefined;
  }
}
function getSwitch(type) {
  switch (type) {
    case 'trueFunction':
      return getArrowFun;
    case 'falseFunction':
      return getFun;
    case 'RegExp':
      return getRegExp;
    case 'Undefined':
      return getUndefined;
  }
}
function string(obj) {
  var indexList = [];
  return JSON.stringify({
    value: copyValue(obj, '', indexList, ''),
    indexList: indexList,
    type: 'ya'
  });
}
function parse(str) {
  var _v$indexList;
  var v = JSON.parse(str);
  if (v.type !== 'ya') return {};
  var value = v.value;
  var list = (_v$indexList = v.indexList) !== null && _v$indexList !== void 0 ? _v$indexList : [];
  for (var i = list.length - 1; i >= 0; i--) {
    var s = value,
      k = list[i].split(','),
      l = k.length;
    for (var j = 0; j <= l - 3; j++) {
      s = s[k[j]];
    }
    s[k[k.length - 2]] = getSwitch(k[l - 1])(s[k[l - 2]]);
  }
  return value;
}
window.ya = {
  string: string,
  parse: parse
};
//# sourceMappingURL=string.js.map
