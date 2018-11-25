module.exports = {
  entry: __dirname + '/src/index.js',
  target: 'node',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
}
