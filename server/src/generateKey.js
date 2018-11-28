const webpush = require('web-push')
const fs = require('fs')

const key = JSON.stringify(webpush.generateVAPIDKeys())
fs.writeFile('key', key)
