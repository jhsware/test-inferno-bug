const webpack = require('webpack')
const path = require('path')

const babelPlugins = [
  'transform-decorators-legacy',
  'babel-plugin-transform-object-rest-spread',
  'babel-plugin-syntax-jsx',
  'add-module-exports',
  [
    'babel-plugin-inferno',
    {
      'imports': true
    }
  ]
]

module.exports = {
  entry: {
    app: path.resolve(__dirname, './app.jsx')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      query: {
        // babel-loader doesn't pick up the transform-decorators-legacy plugin setting from babelrc entry in packageon
        plugins: babelPlugins
      }
    }]
  }
}
