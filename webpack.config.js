const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//const JavaScriptObfuscator = require( 'webpack-obfuscator' );
// const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// var BrotliPlugin = require('brotli-webpack-plugin');

module.exports = [
  {
    context: path.join(__dirname, '/'),
    entry: {
      'main': './src/ts/main.ts'
    },
    output: {
      path: path.resolve(__dirname, './public/javascripts'),
      filename: '[name].js',
      library: '[name]',
    //   publicPath: 'wp-content/themes/lumeric/assets/js/',
    //   chunkFilename: "modules/[name].js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        {
          test: /\.tsx?$/,
          exclude: /\.(spec|test)\.tsx?$/,
          use: ["ts-loader"]
        },
        {
          test: /\.js?$/,
          exclude: /\.(spec|test)\.jsx?$/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"]
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
        }
      ]
    },
    plugins: []
  }
];