import { settings, colors } from '../config/variables'
export default class Box extends phina.display.RectangleShape {
  constructor (width = null, height = null, color = null) {
    if (width === null) width = settings.SCREEN_WIDTH
    if (height === null) height = settings.SCREEN_HEIGHT
    if (color === null) color = colors.black_05
    super({
      width: width,
      height: height,
      fill: color,
      stroke: null,
      strokeWidth: 2,
      padding: 0
    })
    Object.setPrototypeOf(this, Box.prototype)
    this.borderBox = RectangleShape({
      width: width,
      height: height,
      fill: 'transparent',
      stroke: colors.blue,
      strokeWidth: 2,
      padding: 0,
      alpha: 0
    }).addChildTo(this)
    this.borderBox.blendMode = 'lighter'
    this.borderBox.alpha = 0
    this.active = false
  }
  update () {
    this.borderBox.alpha = this.active ? 1 : 0
  }
  setOrigin (x, y) {
    super.setOrigin(x, y)
    this.borderBox.setOrigin(0, 0)
    return this
  }
}
