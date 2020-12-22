
module.exports = {
  devServer: {
    host: 'localhost',
    port: '8081',
    proxy: {
      '/api': {
        target: 'http://api.vikingship.xyz/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
