import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common';
// 因为是babel转译的ts 现在需要个插件检查类型

const config: webpack.Configuration = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist'),
    filename: 'main/app.js',
    publicPath: '/',
  },
  devServer: {
    // spa必备
    historyApiFallback: { index: '/' },
    contentBase: path.join(__dirname, '..', '..', 'dist'),
    host: '127.0.0.1',
    hot: true,
    port: 7000,
    // 这个的作用是让webpack安静点
    stats: 'errors-warnings',
    publicPath: '/',
  },
  plugins: [
    // 热更插件
    new webpack.HotModuleReplacementPlugin(),
    // 命名空间 也是热更用的
    new webpack.NamedModulesPlugin(),
    // 全局变量 区分环境
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify('development'),
    }),
  ],
  // 热更必备
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
});
// 覆盖掉common的配置，加入热更的babel
const config2 = merge.smart(config, {
  module: {
    rules: [{
      test: /\.(tsx|ts)?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              'react-hot-loader/babel',
            ],
          },
        },
      ],
    }],
  },
});
export default config2;