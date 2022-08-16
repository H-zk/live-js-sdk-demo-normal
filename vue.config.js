/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {

  publicPath: '/live',

  productionSourceMap: false,

  transpileDependencies: [
    '@polyv/interactions-receive-sdk',
    '@polyv/interactions-receive-sdk-ui-default'
  ],

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Live SDK Demo',
    }
  }

};
