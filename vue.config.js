// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
//   // lintOnSave: false
// })
const path = require('path')
const isDev = process.env.NODE_ENV === 'development' ? true : false

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: isDev ? './' : './',
  devServer: {
    // IP配置
    // host: '0.0.0.0',
    // 默认端口
    // port: 8080,
    // 启动gzip压缩
    // compress: true,
    // 运行打开
    open: true,
    // 热加载
    hot: true,
    // 配置反向代理
    proxy: {
      // 当地址中有/api的时候会触发代理机制
      [process.env.VUE_APP_BASE_API]: {
        // 要代理的服务器地址  这里不用写 api
        target: 'http://127.0.0.1:6688/',
        changeOrigin: true // 是否跨域
        // pathRewrite: {
        //   ['^' + process.env.VUE_APP_BASE_API]: ''
        // }
      }
    }
  },
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // You are running the esm-bundler build of vue-i18n.
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': resolve('src')
        },
        fallback: {
          path: require.resolve('path-browserify')
        }
      }
    }
  }
}
