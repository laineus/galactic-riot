import { server as WebSocketServer } from 'websocket'
import { ALLOW_ORIGIN } from './settings'
import httpServer from './httpServer'
import join from './join'

process.on('uncaughtException', error => console.error(`error: ${error}`))

const webSocketServer = new WebSocketServer({ httpServer: httpServer, autoAcceptConnections: false })
webSocketServer.on('request', request => {
  if (ALLOW_ORIGIN && request.origin !== ALLOW_ORIGIN) {
    request.reject()
    console.log(`${new Date()} Connection rejected.`)
    return
  }
  const connection = request.accept()
  console.log(`${new Date()} Connection accepted.`)
  join(connection)
})
