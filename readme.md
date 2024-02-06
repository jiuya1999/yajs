一个支持 `undefined`,`function`,`symbol` 和循环引用 的 javascript 序列化库。
全局导出 `ya.string()` 和 `ya.parse()`

安装：
```shell
npm i @jiuya/ya
```

引入：
```js
import {parse, string} from '@jiuya/ya'
import ya from '@jiuya/ya'
```
使用：
```js
const obj = {
    a: true,
    b: [1, 2, 3, Symbol.for('apple')],
    c: {
        d: 1,
        e: ({name,    age})    => {
            console.log(name, age)
        },
        h: (...arr) =>      {
            console.log(arr)
        }
    },
    f  (   )   {
        const c = 3
        console.log(1, this, this.a, c)
    },
    g: /123/g,
    i: undefined,
    j: null,
    [Symbol.for('apple')]: Symbol.for('apple'),
    [Symbol.for('pig')]: {
        pig: 15
    }
}
const co = ya.string(obj)
console.log(co, 'co')
const copy = ya.parse(co)
console.log(copy)
```