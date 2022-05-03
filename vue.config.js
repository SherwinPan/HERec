module.exports = {
    devServer: {
        port: 8082,
        host: '0.0.0.0',
        proxy: {
            '/api': {  //使用"/api"来代替
                target: 'http://localhost:8000', //源地址
                changeOrigin: true, //改变源
                ws:true,
                pathRewrite: {
                    '^/api': '' //路径重写
                }
            }
        },
    },


};