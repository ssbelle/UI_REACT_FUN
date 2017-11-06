const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpack = require('html-webpack-plugin');

// TODO: https://webpack.js.org/guides/production-build/
process.traceDeprecation = true;
const defaultConfig = {
  context: path.resolve(__dirname, 'src'),
  devServer: {
    //hotOnly: true
    contentBase: path.join(__dirname, './public'),
    hot: true
  },
  devtool: 'inline-source-map',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './index.js'
    ]
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: [
          'env',
          ['es2015', {'modules': false}],
          'react'
        ],
        plugins: [
          'react-hot-loader/babel',
          'transform-object-rest-spread',
          //'lodash'
        ]
      }
    },  {
      test: /\.s?css$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'img-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader:'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: 'inline',
            plugins: () => [
              require('postcss-smart-import'),
              require('precss'),
              require('autoprefixer')({
                browsers: 'last 2 versions'
              }),
            ]
          }
        }
      ]
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }]
  },
  output: {
    filename: './src/index.js',
    publicPath: '/',
    path: path.resolve(__dirname, './public'),    //publicPath: './wwwwroot'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new WebpackNotifierPlugin(),
    //new LodashModuleReplacementPlugin,
    //new ExtractTextPlugin('styles.css'),
    new HtmlWebpack({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
      inject: 'body', // inject at the bottom of the body tag
      showErrors: true
    }),
  ],
  watch: true,
};

module.exports = env => {
  /*return env == 'production' ?
    developmentConfig :*/
  console.log(env, 'environment');
  return defaultConfig;
};
