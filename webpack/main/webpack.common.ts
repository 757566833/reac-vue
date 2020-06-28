import path from 'path';
// 生成html的插件
import HtmlWebpackPlugin from 'html-webpack-plugin';
// 把css拆出来的插件
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import webpack from 'webpack';

const config: webpack.Configuration = {
  entry: {
    main: './src/layouts/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
        },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'less-loader',
        },
        ],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif|woff|woff2|otf|ttf)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/',
          name: 'img/[name].[hash:7].[ext]',
        },

      },
    ],
  },
  resolve: {
    // 自动后缀
    extensions: ['.tsx', '.ts','.jsx','.js'],
    // 软连接
    alias: {
      '@': path.resolve('src'),
    },
  },
  plugins: [
    // 生成html
    new HtmlWebpackPlugin({
      title: 'test',
      template: path.resolve(__dirname, 'template.html'),
    }),
    // 拆css
    new MiniCssExtractPlugin({
      filename: 'main/[name].[contenthash].css',
    }),
    // 检查类型
    new ForkTsCheckerWebpackPlugin(),
  ],

};
export default config;