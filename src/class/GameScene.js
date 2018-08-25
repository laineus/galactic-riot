import phina from 'phina.js'
import missionResult from '../utils/missionResult'
import state from '../config/state'
import { colors } from '../config/variables'
import Field from './Field'
import Camera from './Camera'
export default class GameScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, GameScene.prototype)
    this.phase = 0
    this.inProgress = true
    this.backgroundColor = colors.black
    // Field
    this.field = new Field().addChildTo(this)
    // Mission
    this.mission = state.mission
    this.mission.created()
    // Camera
    this.field.camera = new Camera().addChildTo(this)
    this.field.camera.setField(this.field)
    this.field.camera.setTarget(state.player)
    // Interface
    this.interface = InterfaceScreen().addChildTo(this)
    this.interface.initRadar(this.field, state.player)
  }
  update (app) {
    this.mission.update()
    if (!this.inProgress) {
      if (app.keyboard.getKeyDown('Z')) this.exit('Title', { skip: true })
      return
    }
    if (!state.player.isActive()) {
      this.missionFailed()
    } else if (this.mission.functions[this.phase]()) {
      (this.phase + 1 === this.mission.functions.length) ? this.missionCompleted() : this.phase++
    }
  }
  missionCompleted () {
    missionResult(true, 'Time:\nKill:\nMember Death:\nRescue:\n\nRank:\nReward:', '1:14\n10\n12\n5\n\nS\n$1,000').addChildTo(this)
    this.inProgress = false
  }
  missionFailed () {
    missionResult(false, 'Loss:', '$1,000').addChildTo(this)
    this.inProgress = false
  }
}
