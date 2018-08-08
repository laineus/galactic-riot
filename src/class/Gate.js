import state from '../config/state'
export default {
  superClass: 'Sprite',
  init () {
    this.superInit('gate')
    this.setScale(0.3, 0.3)
  },
  update () {
    if (!state.field.player) return
    if (state.field.player.distanceDiff(this) < 50) {
      console.log(112233)
    }
  }
}
