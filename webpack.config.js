var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'lib');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var devtool = 'eval-source-map';
var plugins = [
  new HtmlwebpackPlugin({
    title: 'ViznUI',
    template: path.resolve(APP_PATH, 'template/index.html')
    })
  ]
if (process.argv.indexOf('-p') > -1) {
  plugins.push(new webpack.DefinePlugin({//生产环境
      'process.env': {
          NODE_ENV: JSON.stringify('production')
      }
  }));
  devtool = false;
}
module.exports= {
  entry:  path.resolve(APP_PATH, 'example.js'),
  output: {
    path: BUILD_PATH,
    filename: 'vizn.min.js'
  },
  //babel重要的loader在这里
  module: {
    rules: [
      {
        test: /\.(less|scss|css)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader', 'less-loader']
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: APP_PATH,
      }
    ]
  },

  devtool: devtool,

  devServer: {
   compress: true, // 启用Gzip压缩
   historyApiFallback: true, // 为404页启用多个路径
   hot: true, // 模块热更新，配置HotModuleReplacementPlugin
   https: false, // 适用于ssl安全证书网站
   noInfo: true, // 只在热加载错误和警告
   // ...
 },

 plugins: plugins
}
