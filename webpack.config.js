'use strict';

const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'app.[contenthash:7].js',
    path: __dirname + '/dist',
    clean: true,
  },

  devtool: "source-map",

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },

  module: {
    rules: [{
      test:/\.(s*)css$/,
      use: [
        miniCss.loader,
        'css-loader',
        'sass-loader',
      ]
    },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ]
  },

  plugins: [
    new miniCss({
      filename: 'style[contenthash:7].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: path.join('src', 'img'),
              destination: 'dist/img',
            },
          ],
        },
      },
    }),
  ],
};
