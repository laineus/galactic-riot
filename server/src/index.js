import { server as WebSocketServer } from 'websocket'
import { ALLOW_ORIGIN } from './settings'
import httpsServer from './httpsServer'
import join from './join'

process.on('uncaughtException', error => console.error(`error: ${error}`))

const webSocketServer = new WebSocketServer({ httpServer: httpsServer, autoAcceptConnections: false })
webSocketServer.on('request', request => {
  if (ALLOW_ORIGIN && request.origin !== ALLOW_ORIGIN) {
    request.reject()
    // console.log(`${new Date()} Connection rejected.`)
    return
  }
  const connection = request.accept()
  // console.log(`${new Date()} Connection accepted.`)
  join(connection)
})
