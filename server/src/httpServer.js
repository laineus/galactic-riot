import http from 'http'
import { PORT } from './settings'
import rooms from './rooms'
import register from './register'

const httpServer = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  if (request.method === 'GET') {
    response.end(JSON.stringify({ rooms: rooms.map(r => r.info) }))
  } else if (request.method === 'POST') {
    let body = ''
    request.on('data', chunk => body += chunk)
    request.on('end', () => {
      const data = JSON.parse(body)
      register(data)
      response.end()
    })
  }
})
httpServer.listen(PORT, () => console.log(`${new Date()} Server is listening on port ${PORT}`))

export default httpServer
