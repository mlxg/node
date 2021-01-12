module.exports = options => {
    if (!options.format) {
        console.error('need format')
    }

    return async (ctx, next) => {
        console.log(options.format(ctx.url))
        await next()
    }
}