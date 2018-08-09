import state from '../config/state'
export default {
  superClass: 'DisplayElement',
  init () {
    this.superInit()
    Sprite('gate_blur').addChildTo(this).setScale(1.5, 1.5)
    Sprite('gate').addChildTo(this).setScale(0.33, 0.33)
    Sprite('gate_blur').addChildTo(this).setScale(1, 1)
    this.children[0].blendMode = 'lighter'
    this.children[2].blendMode = 'lighter'
  },
  update () {
    if (!state.field.player) return
    if (state.field.player.distanceDiff(this) < 50) {
      console.log(112233)
    }
  }
}
