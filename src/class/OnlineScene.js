export default class OnlineScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, GameScene.prototype)

    const connect = new WebSocket('ws://127.0.0.1:8091')
    connect.onopen = () => {
      console.log('open')
    }
    connect.onclose = () => {
      console.log('close')
    }

    connect.readyState == connect.OPEN
    connect.send(JSON.stringify(null))
    connect.onmessage(text => {
      JSON.parse(text)
    })
  }
}
