const path = require('path')
const Dotenv = require('dotenv-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new Dotenv(),
    new CopyWebpackPlugin(['manifest.json', 'assets/'])
  ]
}