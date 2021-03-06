import { colors } from '../config/variables'
const ROTATE_LETTERS = ['-', 'ー', '―', '[', ']', ':', '：']
export default class VerticalSub extends phina.display.Label {
  constructor (text = '', option) {
    super(Object.assign({
      text: text,
      fontFamily: 'aldrich',
      fontSize: 16,
      fill: colors.white,
      lineHeight: 1.1
    }, option))
    Object.setPrototypeOf(this, VerticalSub.prototype)
  }
  prerender (canvas) {
    super.prerender(canvas)
    this._offsetY = (this.maxLetter - 1) * this.fontSize / 2
  }
  renderFill (canvas) {
    canvas.context.transform(1, -0.5, 0, 1, 0, 0)
    const context = canvas.context
    this._lines.forEach((line, lineIndex) => {
      line.split('').forEach((letter, letterIndex) => {
        const x = -lineIndex * this.lineSize - this._offset
        const y = letterIndex * this.fontSize - this._offsetY
        context.save()
        context.translate(x, y)
        if (ROTATE_LETTERS.includes(letter)) {
          context.translate(-2, -2)
          context.rotate(Math.degToRad(90))
        }
        context.fillText(letter, 0, 0)
        context.restore()
      })
    })
  }
  get maxLetter () {
    const array = this._lines.map(r => r.length)
    return Math.max(...array)
  }
  calcCanvasWidth () {
    return (this._lines.length + 1) * this.fontSize * this.lineHeight
  }
  calcCanvasHeight () {
    return (this.maxLetter + 2) * this.fontSize
  }
}
