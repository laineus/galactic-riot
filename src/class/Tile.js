export default {
  superClass: 'Sprite',
  init (image, width, height) {
    this.superInit(image)
    this.width = width
    this.height = height
  },
  draw (canvas) {
    const x = -this.width * this.origin.x
    const y = -this.height * this.origin.y
    canvas.context.fillStyle = canvas.context.createPattern(this.image.domElement, 'repeat')
    canvas.context.beginPath()
    canvas.context.translate(x, y)
    canvas.context.fillRect(0, 0, this.width, this.height)
    canvas.context.translate(-x, -y)
  }
}
