export default class FighterBlur extends phina.display.Sprite {
  constructor (image, parent) {
    super(image)
    Object.setPrototypeOf(this, FighterBlur.prototype)
    this.blendMode = 'lighter'
    this.parent = parent
  }
  draw (canvas) {
    this.parent.oldXs.length.times(i => this.execDraw(canvas, i))
  }
  execDraw (canvas, i) {
    if (i < 1) return
    canvas.context.globalAlpha = 0.35 - (i  * 0.03)
    const diffX = this.parent.oldXs[i] - this.parent.x
    const diffY = this.parent.oldYs[i] - this.parent.y
    const dis = Math.hypot(diffX, diffY)
    const deg = Math.radToDeg(Math.atan2(diffY, diffX)) - this.parent.rotation
    const x = Math.cos(Math.degToRad(deg)) * dis
    const y = Math.sin(Math.degToRad(deg)) * dis
    canvas.translate(x, y)
    super.draw(canvas)
  }
}
