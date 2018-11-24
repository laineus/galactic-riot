import http from 'http'
import { PORT } from './settings'
import rooms from './rooms'

const httpServer = http.createServer((_request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify({ rooms: rooms.map(r => r.info) }))
})
httpServer.listen(PORT, () => console.log(`${new Date()} Server is listening on port ${PORT}`))

export default httpServer
