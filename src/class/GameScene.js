import state from '../config/state'
import { colors } from '../config/variables'
import Field from './Field'
import Camera from './Camera'
import InterfaceScreen from './InterfaceScreen'
import MissionResult from './MissionResult'
import AddComputer from '../utils/AddComputer'
export default class GameScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, GameScene.prototype)
    state.score.frame = 0
    state.score.kill = 0
    state.score.death = 0
    state.score.rescue = 0
    state.score.amount = state.save.amount
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
  update () {
    if (!this.inProgress) return
    if (!state.player.isActive()) {
      this.missionFailed()
      return
    }
    state.score.frame++
    this.mission.update()
    this.reinforce()
    if (this.mission.functions[this.phase]()) {
      (this.phase + 1 === this.mission.functions.length) ? this.missionCompleted() : this.phase++
    }
  }
  missionCompleted () {
    new MissionResult(this, true).addChildTo(this)
    this.inProgress = false
  }
  missionFailed () {
    new MissionResult(this, false).addChildTo(this)
    this.inProgress = false
  }
  reinforce () {
    if (state.score.amount <= 0) return
    if (state.field.friend.children.length < this.mission.friendCount) {
      const count = Math.min(state.score.amount, Math.randint(1, 6))
      new AddComputer(null, null, null, 'friend', null, count)
    }
  }
}
