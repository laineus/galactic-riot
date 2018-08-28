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
    this.setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT_C)
    this.active = false
  }
  update () {
    this.stroke = this.active ? colors.blue : 'transparent'
  }
}
