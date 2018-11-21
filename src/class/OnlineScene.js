import state from '../config/state'
import { colors } from '../config/variables'
import Field from './Field'
import Camera from './Camera'
import InterfaceScreen from './InterfaceScreen'
import bgm from '../utils/bgm'
import resetScore from '../utils/resetScore'
import Player from './Player'
export default class OnlineScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, OnlineScene.prototype)
    this.connect = this.initConnect()
  }
  initConnect () {
    const connect = new WebSocket('ws://127.0.0.1:8091')
    connect.onopen = () => {
      console.log('Connected')
      this.startGame()
    }
    connect.onclose = () => {
      console.error('Connection failed')
      this.exit('Title')
    }
    connect.readyState == connect.OPEN
    // connect.send(JSON.stringify(null))
    connect.onmessage = e => {
      const data = JSON.parse(e.data)
      // console.log(data)
    }
    return connect
  }
  startGame () {
    resetScore()
    this.inProgress = true
    this.backgroundColor = colors.black
    // Field
    this.field = new Field().addChildTo(this)
    this.field.setField('sublatant_1')
    // Player
    new Player().setPosition(1000, 1000)
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
    state.score.frame++
  }
}
