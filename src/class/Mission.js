import state from '../config/state'
export default {
  superClass: 'DisplayElement',
  init () {
    this.superInit()
    this.mission = state.mission
    this.mission.index = 0
    this.mission.created()
  },
  update () {
    if (!this.mission.functions[this.mission.index]) return
    if (this.mission.functions[this.mission.index]()) this.mission.index++
  }
}
