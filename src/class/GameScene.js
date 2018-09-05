import state from '../config/state'
import { colors } from '../config/variables'
import Field from './Field'
import Camera from './Camera'
import InterfaceScreen from './InterfaceScreen'
import MissionResult from './MissionResult'
export default class GameScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, GameScene.prototype)
    state.score.time = 0
    state.score.kill = 0
    state.score.death = 0
    state.score.rescue = 0
    this.phase = 0
    this.inProgress = true
    this.canReturn = false
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
    this.interface = new InterfaceScreen().addChildTo(this)
    this.interface.initRadar(this.field, state.player)
  }
  update (app) {
    if (!this.inProgress) {
      // TODO: move to MissionResult
      if (this.canReturn && app.keyboard.getKeyDown('Z')) this.exit('Title', { skip: 1 })
      return
    }
    if (!state.player.isActive()) {
      this.missionFailed()
      return
    }
    state.score.time++
    this.mission.update()
    if (this.mission.functions[this.phase]()) {
      (this.phase + 1 === this.mission.functions.length) ? this.missionCompleted() : this.phase++
    }
  }
  missionCompleted () {
    new MissionResult(true, 'Time:\nKill:\nMember Death:\nRescue:\n\nRank:\nReward:', '1:14\n10\n12\n5\n\nS\n$1,000').addChildTo(this)
    this.end()
  }
  missionFailed () {
    new MissionResult(false, 'Loss:', '$1,000').addChildTo(this)
    this.end()
  }
  end () {
    this.inProgress = false
    setTimeout(() => {
      this.canReturn = true
    }, 3000);
  }
}
