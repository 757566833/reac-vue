import path from 'path';
import merge from 'webpack-merge';
import common from './webpack.common';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import webpack from 'webpack';
const config: webpack.Configuration = merge(common, {
  output: {
    // 注意这里换了一级目录
    path: path.resolve(__dirname, '..', '..', 'dist'),
    filename: 'v/[name].js',
    libraryTarget: 'umd',
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    // 注意这里换了一级目录
    historyApiFallback: { index: '/' },
    contentBase: path.join(__dirname, '..', '..', 'dist'),
    host: '127.0.0.1',
    hot: true,
    port: 7002,
    // 这个的作用是让webpack安静点
    stats: 'errors-warnings',
    publicPath: '/',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify('development'),

    }),
  ],
});
// const config2 = merge.smart(config, {
//   module: {
//     rules: [{
//       test: /\.(tsx|ts)?$/,
//       exclude: /node_modules/,
//       use: [
//         {
//           loader: 'babel-loader',
//           options: {
//             cacheDirectory: true,
//             babelrc: false,
//             presets: [
//               '@babel/preset-env',
//               '@babel/preset-typescript',
//               '@babel/preset-react',
//             ],

//             plugins: [
//               ['@babel/plugin-proposal-decorators', { legacy: true }],
//               ['@babel/plugin-proposal-class-properties', { loose: true }],
//               'react-hot-loader/babel',
//             ],
//           },
//         },
//       ],
//     }],
//   },
// });
export default config;
