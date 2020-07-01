import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import common from './webpack.common';
// import AssetsPlugin from 'assets-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const config: webpack.Configuration = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    // 'react-router': 'ReactRouter',
    // 'react-router-dom': 'ReactRouterDOM',
    'antd': 'antd',
  },
  output: {
    // 改成了chunk命名，避免出现0123这种
    filename: 'main/[name].[chunkhash].js',
    path: path.resolve(__dirname, '..', '..', 'dist'),
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['main/**/*'],
    }),
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify('production'),

    }),
   
  ],
});

export default config;
