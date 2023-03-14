module.exports = {
    // 打包的时候不生成map文件
    // productionSourceMap: false,
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                // pathRewrite: {'^/api': ''}
                // ws: true,
                // changeOrigin: true,

            },
        }
    }
}