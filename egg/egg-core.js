const {resolve, join, parse} = require('path')
const globby = require('globby')

module.exports = app => {
    const AppPath = resolve(__dirname, 'app')
    const context = app['context']  // 创建context

    const fileAbsolutePath = {
        config: join(AppPath, 'config'),
        middleware: join(AppPath, 'middleware'),
        service: join(AppPath, 'service')
    }

    Object.keys(fileAbsolutePath).forEach(v => {
        const path = fileAbsolutePath[v]
        const prop = v
        const files = globby.sync('**/*.js', { // 搜索对应js
            cwd: path
        })

        if (prop !== 'middleware') {
            context[prop] = {}
        }

        files.forEach(file => {
            const filename = parse(file).name
            const content = require(join(path, file))

            if (prop === 'middleware') {
                if (filename in context['config']) {
                    const plugin = content(context['config']['filename'])
                    app.use(plugin)
                }
                return false
            }

            if (prop === 'config' && content) {
                context[prop] = Object.assign({}, context[prop], content)
                return false
            }

            context[prop][filename] = content // 挂载service

        })
    })
}