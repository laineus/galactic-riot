export default class SlicedSprite extends phina.display.Sprite {
  constructor (image, x, y, index) {
    super(image)
    Object.setPrototypeOf(this, SlicedSprite.prototype)
    this.sizeX = Math.ceil(this._width / x)
    this.sizeY = Math.ceil(this._height / y)
    this.posX = ((index - 1) % x) * this.sizeX
    this.posY = Math.floor((index - 1) / x) * this.sizeY
  }
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
