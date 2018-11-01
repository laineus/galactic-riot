import { colors } from '../config/variables'
export default class VerticalSub extends phina.display.Label {
  constructor (text, option) {
    super(Object.assign({
      text: text ? text.split('').join('\n') : '',
      fontFamily: 'aldrich',
      fontSize: 16,
      fill: colors.white,
      lineHeight: 1.1
    }, option))
    Object.setPrototypeOf(this, VerticalSub.prototype)
  }
  setText (text) {
    this.text = text.split('').join('\n')
  }
  renderFill (canvas) {
    canvas.context.transform(1, -0.5, 0, 1, 0, 0)
    super.renderFill(canvas)
  }
}
