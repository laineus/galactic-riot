import state from '../config/state'
import maskImage from '../utils/maskImage'
export default {
  superClass: 'DisplayElement',
  init (options) {
    this.superInit()
    const x = options.x ? options.x : 0
    const y = options.y ? options.y : 0
    if (!state.field.camera.inVision(x, y)) return
    this.level = options.level ? options.level : 5
    this.addChildTo(state.field)
    this.setPosition(x, y)
    this.explosion()
    if (options.piece) this.piece(options.piece)
    if (options.shock) state.field.camera.addShock(options.shock)
    setTimeout(() => this.remove(), 1000)
  },
  explosion () {
    Array('#321', '#D30', '#EA0', '#FBA').forEach((color, i) => {
      const img = i < 2 ? 'smoke' : 'light'
      const range = 50 - (i * 12)
      Number(this.level).times(() => {
        const sprite = maskImage.getSprite(img, color)
        .addChildTo(this)
        .setRotation(Math.randint(0, 360))
        .setScale(Math.random() + (this.level / 5) - (i / 3))
        .tweener.by({
          x: Math.randint(-range, range),
          y: Math.randint(-range, range),
          alpha: -1
        }, i ? 700 : 1500, 'easeOutCirc')
        if (i) sprite.blendMode = 'lighter'
      })
    })
  },
  piece (pieceImage) {
    Number(this.level).times(() => {
      Piece(pieceImage, 3, 3)
      .addChildTo(this)
      .setRotation(Math.randint(0, 360))
      .setPosition(Math.randint(-15, 15), Math.randint(-15, 15))
      .setScale(0.2, 0.2)
      .tweener.by({
        x: Math.randint(-70, 70),
        y: Math.randint(-70, 70),
        alpha: -1
      }, 1500, 'easeOutCirc')
    })
  }
}
