module.exports = {
  devtool: 'eval', // evalでないとmysqlでerror https://github.com/webpack/webpack/issues/3150
  entry: __dirname + '/src/index.js',
  target: 'node',
  externals: {
    mysql2: 'commonjs mysql2'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
}
