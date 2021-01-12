function compose(middleware) {
    return function (context, next) {
        let index = -1
        return dispatch(0)

        function dispatch(i) {
            if (i <= index) {
                return Promise.reject('err')
            }
            index = i
            let fn = middleware[i]

            if (i === middleware.length) {
                fn = next
            }

            if (!fn) return Promise.resolve()

            try {
                return Promise.resolve(fn(context, function next() {
                    return dispatch(i + 1)
                }))
            } catch (err) {
                return Promise.reject(err)
            }

        }
    }
}


async function fn1(ctx, next) {
    console.log(1)
    const hi = await Promise.resolve('1hi')
    console.log(hi)
    await next()
    console.log('1end')
}

async function fn2(ctx, next) {
    console.log(2)
    const hi = await Promise.resolve('2hi')
    console.log(hi)
    await next()
    console.log('2end')
}

compose([fn1, fn2])({})