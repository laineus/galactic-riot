import fs from 'fs'
import https from 'https'
import express from 'express'
import { PORT, VAPID_PUBLIC_KEY, SSL_CERT, SSL_KEY } from './settings'
import rooms from './rooms'
import register from './register'

const app = express()
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.get('*', (_request, response) => {
  response.send(JSON.stringify({ rooms: rooms.map(r => r.info), publicKey: VAPID_PUBLIC_KEY }))
})
app.post('*', (request, response) => {
  let body = ''
  request.on('data', chunk => body += chunk)
  request.on('end', () => {
    const data = JSON.parse(body)
    register(data).then(() => {
      response.sendStatus(201)
    }).catch(error => {
      console.error(error)
      response.sendStatus(401)
    })
  })
})

const httpsServer = https.createServer({ key: fs.readFileSync(SSL_KEY), cert: fs.readFileSync(SSL_CERT) }, app)
httpsServer.listen(PORT)
export default httpsServer
