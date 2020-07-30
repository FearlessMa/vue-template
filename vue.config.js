const path = require("path");
// const config = require('./vue.env');

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [".js"],
      alias: {
        src: path.resolve(__dirname, "./src/"),
        components: path.resolve(__dirname, "./src/components")
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      return [{ ...args[0], title: "vue-demo" }];
    });
  }
  // ...config,
};
