/**
 * 事件模式
 */
const fs = require('fs')

function readFn(err, data) {
    console.log(data.toString())
}


class Event {
    constructor() {
        this.map = {}
    }

    add(name, fn) {
        if (this.map[name]) {
            this.map[name].push(fn)
            return false
        }

        this.map[name] = [fn]
        return this
    }

    emit(name, ...arg) {
        this.map[name].forEach(fn => fn(...arg))
        // 链式调用
        return this
    }
}

let e = new Event()

e.add('readFn', readFn)

fs.readFile('./mock.txt', (err, data) => {

    if (err) return

    e.emit('readFn', null, data)
})