import path from 'path';
import fs from 'fs';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const VueLoaderPlugin = require('vue-loader/lib/plugin');
import AssetsPlugin from 'assets-webpack-plugin';
import webpack, { Entry, EntryFunc } from 'webpack';

const entry: string | string[] | Entry | EntryFunc = {};


const getEntry = (url: string) => {
  if (url.includes('component') ||
    url.includes('hooks') ||
    url.includes('services') ||
    url.includes('http')
  ) {
    return;
  }
  const list = fs.readdirSync(url);
  for (const iterator of list) {
    if (iterator.includes('.ts')&&!iterator.includes('.d.ts')) {
      entry[`/${url}/${iterator}`
          .replace('/index.ts', '')
          .replace('.ts', '')
          .replace('src/pages/vue/', '')
          .replace(/\//g, '')] = `./${url}/${iterator}`;
    } else if (!iterator.includes('.')) {
      getEntry(`${url}/${iterator}`);
    }
  }
};
const rootpath = path.join('src', 'pages', 'vue');
getEntry(rootpath);
console.log(entry);
const config: webpack.Configuration = {
  entry,
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-typescript', // 引用Typescript插件
                  {
                    allExtensions: true, // 🔴支持所有文件扩展名
                  },
                ],
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
        test: /\.vue$/,
        loader: 'vue-loader',
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
    extensions: ['.vue', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve('src'),
    },
  },
  plugins: [
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.join(__dirname, '..', '..', 'dist', 'v'),
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'v/[name].[contenthash].css',
    }),
  ],

};
export default config;
