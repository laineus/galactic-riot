import missionResult from '../utils/missionResult'
import state from '../config/state'
export default {
  superClass: 'DisplayElement',
  init () {
    this.superInit()
    // Field
    this.field = Field().addChildTo(this)
    // Mission
    this.mission = state.mission
    this.mission.index = 0
    this.mission.created()
    // Camera
    this.field.camera = Camera().addChildTo(this)
    this.field.camera.setField(this.field)
    this.field.camera.setTarget(state.player)
    // Interface
    this.interface = InterfaceScreen().addChildTo(this)
    this.interface.initRadar(this.field, state.player)
  },
  update () {
    this.mission.update()
    if (!this.mission.functions[this.mission.index]) return
    if (this.mission.functions[this.mission.index]()) this.mission.index++
  },
  missionCompleted () {
    missionResult(true, 'Time:\nKill:\nMember Death:\nRescue:\n\nRank:\nReward:', '1:14\n10\n12\n5\n\nS\n$1,000').addChildTo(this)
  },
  missionFailed () {
    missionResult(false, 'Loss:', '$1,000').addChildTo(this)
  }
}
