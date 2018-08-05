import variables from '../config/variables'
export default {
  superClass: 'Label',
  init (option) {
    this.superInit(option)
    this.blendMode = 'lighter'
    this.fill = option.fill || variables.color.white
    this.shadow = option.shadow || variables.color.blue
  },
  renderFill (canvas) {
    canvas.context.shadowBlur = 5
    canvas.context.shadowColor = this.shadow
    canvas.context.fillStyle = this.shadow
    this.superMethod('renderFill', canvas)
    canvas.context.shadowBlur = 15
    canvas.context.fillStyle = this.fill
    this.superMethod('renderFill', canvas)
  }
}
