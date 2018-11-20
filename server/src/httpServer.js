import http from 'http'
import { PORT } from './settings'

const httpServer = http.createServer((_request, response) => {
  response.writeHead(404)
  response.end()
})
httpServer.listen(PORT, () => console.log(`${new Date()} Server is listening on port ${PORT}`))

export default httpServer
