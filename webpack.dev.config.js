const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = {
  mode: "development",

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: "",
    filename: "[name]-[contenthash:8].js",
  },

  entry: "./src/index.tsx",

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {loader: "ts-loader", options: {transpileOnly: true}}
      },
      {
        test: /\.(css)$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: 'images',
              name: '[name]-[sha1:hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),
    new ErrorOverlayPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintWebpackPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new CopyWebpackPlugin({
      patterns: [{from: 'src/lib/assets', to: 'build/assets'}]
    }),
    new Dotenv()
  ],

  devtool: 'cheap-module-source-map',

  devServer: {
    contentBase: path.join(__dirname, "build"),
    port: 3000,
    historyApiFallback: true,
    hot: true,
    overlay: true
  }
}

module.exports = config;