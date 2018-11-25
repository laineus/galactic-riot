import http from 'http'
import express from 'express'
import { PORT, VAPID_PUBLIC_KEY } from './settings'
import rooms from './rooms'
import register from './register'

const app = express()
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.get('/', (_request, response) => {
  response.send(JSON.stringify({ rooms: rooms.map(r => r.info), publicKey: VAPID_PUBLIC_KEY }))
})
app.post('/', (request, response) => {
  let body = ''
  request.on('data', chunk => body += chunk)
  request.on('end', () => {
    const data = JSON.parse(body)
    register(data)
    response.send()
  })
})

const httpServer = http.Server(app)
httpServer.listen(PORT)
export default httpServer
