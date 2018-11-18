export default class SlicedSprite extends phina.display.Sprite {
  constructor (image, x, y, index) {
    super(image)
    Object.setPrototypeOf(this, SlicedSprite.prototype)
    this.sizeX = Math.ceil(this._width / x)
    this.sizeY = Math.ceil(this._height / y)
    this.x = x
    this.y = y
    this.index = index
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
  get index () {
    return this._index
  }
  set index (i) {
    this._index = i
    this.posX = ((i- 1) % this.x) * this.sizeX
    this.posY = Math.floor((i- 1) / this.x) * this.sizeY
  }
}
