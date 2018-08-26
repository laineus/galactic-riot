import { colors } from '../config/variables'
export default class BlurLabel extends phina.display.Label {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, BlurLabel.prototype)
    this.blendMode = 'lighter'
    this.fill = option.fill || colors.white
    this.shadow = option.shadow || colors.blue
  }
  renderFill (canvas) {
    canvas.context.shadowBlur = 5
    canvas.context.shadowColor = this.shadow
    canvas.context.fillStyle = this.shadow
    super.renderFill(canvas)
    canvas.context.shadowBlur = 15
    canvas.context.fillStyle = this.fill
    super.renderFill(canvas)
  }
}
