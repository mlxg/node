async function fn() {
    return 2
}

const getPosts = () =>
    new Promise(resolve => {
        resolve([
            {
                name: 'a'
            }
        ])
    })

fn().then(console.log)

async function fn2() {
    try {
        // 把await放在promise函数前可以获取函数包裹的内容
        const num = await fn()
        console.log(num)
        fn().then(console.log)
        const posts = await getPosts()
        getPosts().then(console.log)
        console.log(posts)
    } catch (err) {
        console.log(err)
    }
}

fn2()


const fs = require('fs')

const readFile = fileName =>
    new Promise((resolve, reject) => {
        fs.readFile(fileName, (error, data) => {
            if (error) {
                reject(error)
                return false
            }

            resolve(data)
        })
    })

async function main() {
    const txt = await readFile('../mock.txt')
    console.log(txt.toString())
}

main()