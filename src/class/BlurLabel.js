import variables from '../config/variables'
export default {
  superClass: 'Label',
  init (option) {
    this.superInit(option)
    this.blendMode = 'lighter'
    this.shadowOffsetX = option.shadowOffsetX || 0
    this.shadowOffsetY = option.shadowOffsetY || 0
    this.shadowBlur = option.shadowBlur != null ? option.shadowBlur : 10
    this.shadowColor = option.shadowColor || variables.color.blue
  },
  draw (canvas) {
    canvas.context.shadowOffsetX = this.shadowOffsetX
    canvas.context.shadowOffsetY = this.shadowOffsetY
    canvas.context.shadowBlur = this.shadowBlur
    canvas.context.shadowColor = this.shadowColor
    this.superMethod('draw', canvas)
    canvas.context.shadowOffsetX = null
    canvas.context.shadowOffsetY = null
    canvas.context.shadowBlur = null
    canvas.context.shadowColor = null
  }
}
