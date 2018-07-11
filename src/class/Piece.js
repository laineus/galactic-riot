export default {
  superClass: 'Sprite',
  init (image, x, y) {
    this.superInit(image)
    this.sizeX = Math.ceil(this._width / x)
    this.sizeY = Math.ceil(this._height / y)
    this.posX = Math.randint(0, this._width - this.sizeX)
    this.posY = Math.randint(0, this._height - this.sizeY)
  },
  draw (canvas) {
    canvas.context.drawImage(
      this.image.domElement,
      this.posX,
      this.posY,
      this.sizeX,
      this.sizeY,
      -this.sizeX * this.originX,
      -this.sizeY * this.originY,
      this.sizeX,
      this.sizeY
    )
  }
}
