import state from '../config/state'
import { colors, settings } from '../config/variables'
import Field from './Field'
import Camera from './Camera'
import InterfaceScreen from './InterfaceScreen'
import MissionResult from './MissionResult'
import AddComputer from '../utils/AddComputer'
import bgm from '../utils/bgm'
import Text from './Text'
import resetScore from '../utils/resetScore'
export default class GameScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, GameScene.prototype)
    resetScore()
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
    this.interface = new InterfaceScreen().addChildTo(this)
    this.interface.initRadar(this.field, state.player)
    // BGM
    bgm.set(this.mission.bgm)
    // Credit
    this.credit()
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
  credit () {
    if (this.mission.index <= state.save.mission) return
    const credit1 = DisplayElement().addChildTo(this).setPosition(settings.SCREEN_WIDTH - 40, settings.SCREEN_HEIGHT_C + 40)
    new Text('Graphics & Music', 11, { align: 'right' }).addChildTo(credit1).setPosition(0, -10)
    new Text('Laineus', 15, { align: 'right' }).addChildTo(credit1).setPosition(0, 10)
    credit1.alpha = 0
    credit1.tweener.wait(400).to({ alpha: 1 }, 800).wait(1600).to({ alpha: 0 }, 800).play()
    const credit2 = DisplayElement().addChildTo(this).setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C - 10)
    new Text('Produced by', 12).addChildTo(credit2).setPosition(0, -10)
    new Text('Laineus', 16).addChildTo(credit2).setPosition(0, 10)
    credit2.alpha = 0
    credit2.tweener.wait(4700).to({ alpha: 1 }, 800).wait(1600).to({ alpha: 0 }, 800).play()
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
