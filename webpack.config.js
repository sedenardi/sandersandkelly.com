const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [
      'whatwg-fetch'
    ]
  },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })]
};
