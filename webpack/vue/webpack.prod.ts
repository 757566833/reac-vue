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
    filename: 'v/[name].[chunkhash].js',
    libraryTarget: 'umd',
    publicPath: '/',
  },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['v/**/*'],
    }),
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify('production'),

    }),
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify('production'),

    }),
  ],
});

export default config;
