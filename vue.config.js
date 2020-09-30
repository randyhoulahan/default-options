module.exports = {
  css       : { extract: false },
  lintOnSave: true,
  devServer : {
    port: 8888
  },

  chainWebpack: config => {
    config.resolve.symlinks(true)
  }
}
