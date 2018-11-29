const webpack = require('webpack')
require('dotenv').config()
module.exports = {
  entry: __dirname + '/src/index.js',
  target: 'node',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        PORT: JSON.stringify(process.env.PORT),
        DB_HOST: JSON.stringify(process.env.DB_HOST),
        DB_USER: JSON.stringify(process.env.DB_USER),
        DB_PASS: JSON.stringify(process.env.DB_PASS),
        DB_NAME: JSON.stringify(process.env.DB_NAME),
        VAPID_PUBLIC_KEY: JSON.stringify(process.env.VAPID_PUBLIC_KEY),
        VAPID_PRIVATE_KEY: JSON.stringify(process.env.VAPID_PRIVATE_KEY),
        SSL_KEY: JSON.stringify(process.env.SSL_KEY),
        SSL_CERT: JSON.stringify(process.env.SSL_CERT),
        ALLOW_ORIGIN: JSON.stringify(process.env.ALLOW_ORIGIN)
      }
    })
  ],
}
