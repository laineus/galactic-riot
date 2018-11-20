import { WebSocketServer } from 'websocket'
import http from 'http'
const PORT = 8091
const ALLOW_ORIGIN = 'galactic-riot.laineus.com'

process.on('uncaughtException', error => console.error(`error: ${error}`))

const httpServer = http.createServer((_request, response) => {
  response.writeHead(404)
  response.end()
})
httpServer.listen(PORT, () => console.log(`${new Date()} Server is listening on port ${PORT}`))

webSocketServer = new WebSocketServer({ httpServer: httpServer, autoAcceptConnections: false })
webSocketServer.on('request', request => {
  // if (request.origin !== ALLOW_ORIGIN) {
  //   request.reject()
  //   return
  // }
  const connection = request.accept()
  console.log(`${new Date()} Connection accepted.`)
  connection.on('close', (reasonCode, description) => {
    console.log(`${new Date()} Disconnected. Reson: [${reasonCode}] ${description}`)
  })
})
