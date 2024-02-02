```js
    const obj = {
        a: true,
        b: [1, 2, 3],
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
        j: null
    }
    const co = ya.string(obj)
    console.log(co)
    const copy = ya.parse(co)
    console.log(copy)
```