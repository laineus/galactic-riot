import state from '../config/state'
import fields from '../config/fields'
export default {
  superClass: 'DisplayElement',
  init () {
    this.superInit()
    // Field
    this.field = Field(fields.sublatant_1).addChildTo(this)
    // Mission
    this.mission = state.mission
    this.mission.index = 0
    this.mission.created()
    // Camera
    this.field.camera = Camera()
    this.field.camera.setTarget(state.player)
    // Interface
    this.interface = InterfaceScreen().addChildTo(this)
    this.field.interface = InterfaceField().addChildTo(this.field)
  },
  update () {
    if (!this.mission.functions[this.mission.index]) return
    if (this.mission.functions[this.mission.index]()) this.mission.index++
  }
}
