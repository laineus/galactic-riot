import state from '../config/state'
import { colors } from '../config/variables'
import Field from './Field'
import Camera from './Camera'
import InterfaceScreen from './InterfaceScreen'
import bgm from '../utils/bgm'
import resetScore from '../utils/resetScore'
import Player from './Player'
import OnlinePlayer from './OnlinePlayer'
export default class OnlineScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, OnlineScene.prototype)
    this.inProgress = false
    this.connect = this.initConnect()
    this.players = {}
  }
  initConnect () {
    const connect = new WebSocket('ws://127.0.0.1:8091')
    connect.onopen = () => this.startGame()
    connect.onclose = () => this.exit('Title', { skip: 1 })
    connect.onmessage = e => {
      const data = JSON.parse(e.data)
      if (data.method === 'id') connect.id = data.body
      if (data.method === 'playersData') this.playersData(data.body)
    }
    return connect
  }
  playersData (users) {
    users.forEach(user => {
      if (user.id === this.connect.id) return
      if (this.players[user.id]) {
        this.players[user.id].x = user.x
        this.players[user.id].y = user.y
        this.players[user.id].rotation = user.r
      } else {
        this.players[user.id] = new OnlinePlayer().setFighter(user.fighter)
      }
    })
  }
  startGame () {
    resetScore()
    this.inProgress = true
    this.backgroundColor = colors.black
    // Field
    this.field = new Field().addChildTo(this)
    this.field.setField('sublatant_1')
    // Player
    this.player = new Player().setPosition(1000, 1000)
    // Camera
    this.field.camera = new Camera().addChildTo(this)
    this.field.camera.setField(this.field)
    this.field.camera.setTarget(state.player)
    // Interface
    this.interface = new InterfaceScreen().addChildTo(this)
    this.interface.initRadar(this.field, state.player)
    // BGM
    bgm.set(null)
  }
  update () {
    if (!this.inProgress) return
    // if (!state.player.isActive()) {
    //   return
    // }
    this.send('playerData', this.playerData)
    state.score.frame++
  }
  send (method, data) {
    this.connect.send(JSON.stringify({ method: method, body: data }))
  }
  get playerData () {
    return { fighter: this.player.fighter.id, x: this.player.x, y: this.player.y, r: this.player.rotation }
  }
}
