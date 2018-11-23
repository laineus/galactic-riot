import state from '../config/state'
import { colors, settings } from '../config/variables'
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
    this.connection = this.connect()
    this.players = {}
  }
  connect () {
    const connection = new WebSocket(settings.WS_SERVER)
    connection.onopen = () => this.startGame()
    connection.onclose = () => this.exit('Title', { skip: 1 })
    connection.onmessage = e => {
      const data = JSON.parse(e.data)
      if (data.method === 'id') connection.id = data.body
      if (data.method === 'playersData') this.playersData(data.body)
      if (data.method === 'hit') {
        this.player.hp -= data.damage
      }
    }
    connection.commit = (method, data) => connection.send(JSON.stringify({ method: method, body: data }))
    return connection
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
        this.players[user.id] = new OnlinePlayer(this.connection, user.id).setFighter(user.fighter)
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
    // if (!state.player.isActive) {
    //   return
    // }
    this.connection.commit('playerData', this.playerData)
    state.score.frame++
  }
  get playerData () {
    return { fighter: this.player.fighter.id, x: this.player.x, y: this.player.y, r: this.player.rotation, hp: this.player.hp }
  }
}
