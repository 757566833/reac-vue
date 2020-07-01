import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import common from './webpack.common';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpack from 'webpack';
const config: webpack.Configuration = merge(common, {

  output: {
    // 注意这里换了一级目录
    path: path.resolve(__dirname, '..', '..', 'dist'),
    filename: 'r/[name].[chunkhash].js',
    libraryTarget: 'umd',
    publicPath: '/',
  },
  mode: 'production',
  devtool: 'source-map',
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    // 'react-router': 'ReactRouter',
    // 'react-router-dom': 'ReactRouterDOM',
    'antd': 'antd',
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['r/**/*'],
    }),
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify('production'),

    }),
  ],
});

export default config;
