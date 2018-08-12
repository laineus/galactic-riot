import state from '../config/state'
export default {
  superClass: 'DisplayElement',
  init (fieldSrc, x, y) {
    this.superInit()
    this.fieldSrc = fieldSrc
    this.x = x
    this.y = y
    this.active = false
    this.blur1 = Sprite('gate_blur').addChildTo(this).setScale(1.5, 1.5)
    this.blur1.blendMode = 'lighter'
    this.gate = Sprite('gate').addChildTo(this).setScale(0.33, 0.33)
    this.blur2 = Sprite('gate_blur').addChildTo(this).setScale(1, 1)
    this.blur2.blendMode = 'lighter'
  },
  update () {
    if (!state.player) return
    if (state.player.distanceDiff(this) < 50 && !this.active) {
      state.player.rotation = this.rotation
      this.blur1.tweener.to({ scaleX: 50 }, 200, 'easeInQuad')
      this.blur2.tweener.to({ scaleX: 50 }, 200, 'easeInQuad')
      state.interface.lightMask.tweener.to({ alpha: 1 }, 200, 'easeInQuad').to({ alpha: 0 }, 300, 'easeOutQuad')
      setTimeout(() => {
        state.field.resetField(this.fieldSrc)
        state.interface.setRadar(state.field, state.player)
      }, 200)
      this.active = true
    }
  }
}
