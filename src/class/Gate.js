import state from '../config/state'
export default {
  superClass: 'DisplayElement',
  init (field, x, y) {
    this.superInit()
    this.field = field
    this.x = x
    this.y = y
    Sprite('gate_blur').addChildTo(this).setScale(1.5, 1.5)
    Sprite('gate').addChildTo(this).setScale(0.33, 0.33)
    Sprite('gate_blur').addChildTo(this).setScale(1, 1)
    this.children[0].blendMode = 'lighter'
    this.children[2].blendMode = 'lighter'
  },
  update () {
    if (!state.player) return
    if (state.player.inVision(this)) {
      const diff = Math.sign(state.player.degreeDiff(this))
      state.player.x += Math.cos(Math.degToRad(state.player.rotation + (90 * diff))) * 3
      state.player.y += Math.sin(Math.degToRad(state.player.rotation + (90 * diff))) * 3
    }
    if (state.player.distanceDiff(this) < 50) {
      state.player.rotation = this.rotation
      state.player.physical.velocity.x = Math.cos(Math.degToRad(this.rotation)) * 60
      state.player.physical.velocity.y = Math.sin(Math.degToRad(this.rotation)) * 60
      state.player.setSpeed(60)
    }
  }
}
