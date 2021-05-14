const { NODE_ENV } = process.env;
const devConfig = {
  devServer: {
    disableHostCheck: true,
    // https: true,
    proxy: {
      '/mock': {
        target: 'http://localhost:9000',
        pathRewrite: {
          '^/mock': ''
        }
      },
      './': {
        target: 'localhost:9000',
        changeOrigin: true,
        // cookieDomainRewrite: {
        //   'www.baidu.com': ''
        // },
        ws: true
      }
    }
  }
};
const prodConfig = {
  publicPath: ''
};

module.exports = ((env) => (env == 'development' ? devConfig : prodConfig))(NODE_ENV);
