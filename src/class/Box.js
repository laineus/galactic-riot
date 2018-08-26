import { colors } from '../config/variables'
export default class Box extends phina.display.RectangleShape {
  constructor (width, height) {
    super({
      width: width,
      height: height,
      fill: colors.black_05,
      stroke: null,
      strokeWidth: 2,
      padding: 0
    })
    Object.setPrototypeOf(this, Box.prototype)
    this.active = false
  }
  update () {
    this.stroke = this.active ? colors.blue : 'transparent'
  }
}
