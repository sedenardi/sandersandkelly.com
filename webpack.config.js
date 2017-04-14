const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [
      'whatwg-fetch',
      'promise-polyfill'
    ],
    app: './src/js/app.js'
  },
  output: {
    filename: '[name].js',
    path: './public/js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }]
  },
  plugins: [new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })]
};
