import state from '../config/state'
import { fields } from '../config/variables'
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
    this.field.camera = Camera().addChildTo(this)
    this.field.camera.setField(this.field)
    this.field.camera.setTarget(state.player)
    // Interface
    this.interface = InterfaceScreen().addChildTo(this)
    this.interface.setRadar(this.field, state.player)
  },
  update () {
    if (!this.mission.functions[this.mission.index]) return
    if (this.mission.functions[this.mission.index]()) this.mission.index++
  }
}
