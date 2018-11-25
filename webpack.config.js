const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/public/js',
    publicPath: '/js/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
      new webpack.DefinePlugin({
        'process.env.WS_SERVER': JSON.stringify(process.env.WS_SERVER),
        'process.env.HTTP_SERVER': JSON.stringify(process.env.HTTP_SERVER)
      })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 8080
  }
}
