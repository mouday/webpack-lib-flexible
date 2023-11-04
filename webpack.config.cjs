"use strict";

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 生产环境
  mode: "production",

  // 打包入口
  entry: {
    index: "./src/index.js",
  },

  // 指定输出地址及打包出来的文件名
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-plugin-px2rem",
                    // 配置参数
                    {
                      // 假设设计稿是1200px, px->rem的比例是：100
                      // 1200 / 100 = 12
                      rootValue: 12,
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // 将 CSS 提取到单独的文件中
    new MiniCssExtractPlugin(),
    // 将为你生成一个 HTML5 文件
    new HtmlWebpackPlugin(
      {
        template: "./index.html",
      }
    )
  ],
};
