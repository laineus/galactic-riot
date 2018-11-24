import state from '../config/state'
import { colors, settings } from '../config/variables'
import Field from './Field'
import Camera from './Camera'
import Text from './Text'
import InterfaceScreen from './InterfaceScreen'
import bgm from '../utils/bgm'
import resetScore from '../utils/resetScore'
import OnlinePlayer from './OnlinePlayer'
import OnlineFighter from './OnlineFighter'
import OnlineRespawn from './OnlineRespawn'
import secToString from '../utils/secToString'
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
    connection.onclose = () => this.exit('Title', { skip: 2 })
    connection.onmessage = e => {
      const data = JSON.parse(e.data)
      if (data.method === 'init') this.startGame(data.body)
      if (data.method === 'update') this.dataUpdate(data.body)
      if (data.method === 'hit') this.player.damage(data.body.damage, data.body.shooter)
      if (data.method === 'laser' && this.players[data.body]) this.players[data.body].mainAction()
      if (data.method === 'dead') this.dead(data.body)
    }
    connection.commit = (method, data) => connection.send(JSON.stringify({ method: method, body: data }))
    return connection
  }
  dataUpdate (data) {
    this.playersData(data.players)
    this.timer.text = secToString(data.time)
    this.kill.text = `${data.eastKill} - ${data.westKill}`
  }
  dead (data) {
    const fighter = this.players[data.id]
    if (fighter && fighter.isActive) fighter.dead()
    if (this.connection.id === data.shooter) state.score.kill++
  }
  playersData (users) {
    users.forEach(user => {
      if (user.id === this.connection.id) return
      if (this.players[user.id] && this.players[user.id].isActive) {
        this.players[user.id].x = user.x
        this.players[user.id].y = user.y
        this.players[user.id].rotation = user.r
        this.players[user.id].hp = user.hp
      } else if (user.hp > 0) {
        this.players[user.id] = new OnlineFighter(this.connection, user.id).setType(user.team === this.connection.team).setFighter(user.fighter)
      }
    })
  }
  startGame (data) {
    this.connection.id = data.id
    this.connection.team = data.team
    resetScore()
    this.inProgress = true
    this.respawnDelay = 0
    this.backgroundColor = colors.black
    // Field
    this.field = new Field().addChildTo(this)
    this.field.setField('sublatant_5')
    // Camera
    this.field.camera = new Camera().addChildTo(this)
    this.field.camera.setField(this.field)
    // Interface
    this.interface = new InterfaceScreen().addChildTo(this)
    // Player
    this.setPlayer()
    // State
    this.timer = new Text('', 24).addChildTo(this).setPosition(settings.SCREEN_WIDTH_C, 60)
    this.kill = new Text('', 18).addChildTo(this).setPosition(settings.SCREEN_WIDTH_C, 100)
    // BGM
    bgm.set(null)
  }
  setPlayer () {
    const west = this.connection.team === 0
    this.player = new OnlinePlayer(this.connection).setPosition(west ? 200 : 6800, Math.randint(1000, 3000)).setRotation(west ? 0 : 180)
    this.field.camera.setTarget(state.player)
    this.interface.initRadar(this.field, state.player)
  }
  update () {
    if (!this.inProgress) return
    if (!state.player.isActive) {
      if (this.respawnDelay > 0) {
        this.respawnDelay--
        this.respawn.gauge.value = this.respawn.gauge.maxValue - this.respawnDelay
        if (this.respawnDelay === 0) {
          this.setPlayer()
          this.respawn.remove()
        }
      } else {
        this.respawnDelay = 120
        this.respawn = new OnlineRespawn().addChildTo(this)
        this.respawn.gauge.maxValue = this.respawnDelay
      }
      return
    }
    state.score.frame++
  }
}
