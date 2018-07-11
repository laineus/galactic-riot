import state from '../config/state'
import maskImage from '../utils/maskImage'
export default {
  superClass: 'DisplayElement',
  init (x, y) {
    this.superInit()
    if (Math.hypot(state.field.player.x - x, state.field.player.y - y) > 600) return
    this.addChildTo(state.field)
    this.setPosition(x, y)
    this.explosion()
    state.field.camera.addShock(25)
    setTimeout(() => this.remove(), 1000)
  },
  explosion () {
    Array('#321', '#D30', '#EA0', '#FBA').forEach((color, i) => {
      const img = i < 2 ? 'smoke' : 'light'
      const range = 50 - (i * 12)
      Number(5).times(() => {
        const sprite = maskImage.getSprite(img, color)
        .addChildTo(this)
        .setRotation(Math.randint(0, 360))
        .setScale(Math.random() + 1 - (i / 3))
        .tweener.by({
          x: Math.randint(-range, range),
          y: Math.randint(-range, range),
          alpha: -1
        }, i ? 700 : 1500, 'easeOutCirc')
        if (i) sprite.blendMode = 'lighter'
      })
    })
  }
}
