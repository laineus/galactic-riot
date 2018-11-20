import { WebSocketServer } from 'websocket'
import httpServer from './httpServer'

process.on('uncaughtException', error => console.error(`error: ${error}`))

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
