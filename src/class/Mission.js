import mission from '../mission/mission1'
export default {
  superClass: 'DisplayElement',
  init () {
    this.superInit()
    mission.index = 0
  },
  update () {
    if (!mission.functions[mission.index]) return
    if (mission.functions[mission.index]()) mission.index++
  }
}
