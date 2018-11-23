import state from '../config/state'
import { colors, settings } from '../config/variables'
import Field from './Field'
import Camera from './Camera'
import InterfaceScreen from './InterfaceScreen'
import bgm from '../utils/bgm'
import resetScore from '../utils/resetScore'
import OnlinePlayer from './OnlinePlayer'
import OnlineFighter from './OnlineFighter'
export default class OnlineScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, OnlineScene.prototype)
    this.inProgress = false
    this.connection = this.connect()
    this.players = {}
  }
  connect () {
    const connection = new WebSocket(settings.WS_SERVER)
    connection.onopen = () => true
    connection.onclose = () => this.exit('Title', { skip: 1 })
    connection.onmessage = e => {
      const data = JSON.parse(e.data)
      if (data.method === 'init') this.init(data.body)
      if (data.method === 'playersData') this.playersData(data.body)
      if (data.method === 'hit') this.player.damage(data.body)
      if (data.method === 'laser' && this.players[data.body]) this.players[data.body].mainAction()
    }
    connection.commit = (method, data) => connection.send(JSON.stringify({ method: method, body: data }))
    return connection
  }
  init (data) {
    this.connection.id = data.id
    this.connection.team = data.team
    this.startGame()
  }
  playersData (users) {
    users.forEach(user => {
      if (user.id === this.connection.id) return
      if (this.players[user.id]) {
        this.players[user.id].x = user.x
        this.players[user.id].y = user.y
        this.players[user.id].rotation = user.r
        this.players[user.id].hp = user.hp
      } else {
        this.players[user.id] = new OnlineFighter(this.connection, user.id).setFighter(user.fighter)
      }
    })
  }
  startGame () {
    resetScore()
    this.inProgress = true
    this.backgroundColor = colors.black
    // Field
    this.field = new Field().addChildTo(this)
    this.field.setField('sublatant_5')
    // Camera
    this.field.camera = new Camera().addChildTo(this)
    this.field.camera.setField(this.field)
    // Player
    this.setPlayer()
    // Interface
    this.interface = new InterfaceScreen().addChildTo(this)
    this.interface.initRadar(this.field, state.player)
    // BGM
    bgm.set(null)
  }
  setPlayer () {
    const west = this.connection.team === 0
    this.player = new OnlinePlayer(this.connection).setPosition(west ? 200 : 6800, Math.randint(1000, 3000)).setRotation(west ? 0 : 180)
    this.field.camera.setTarget(state.player)
  }
  update () {
    if (!this.inProgress) return
    if (!state.player.isActive) {
      this.setPlayer()
      return
    }
    state.score.frame++
  }
}
