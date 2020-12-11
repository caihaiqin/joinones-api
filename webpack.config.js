// 引入nodejs 的path模块，path.resolve用来处理绝对路径
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {

  // chainWebpack: (config) => {
  //   //修改文件引入自定义路径
  //   config.resolve.alias

  //     .set('server', resolve('server'))
  // }
  resolve: {
    alias: {
      'server': path.resolve(__dirname, 'server')
    }
  }
}