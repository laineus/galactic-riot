import { settings } from '../config/variables'
export default class Camera extends phina.display.DisplayElement {
  constructor () {
    super()
    Object.setPrototypeOf(this, Camera.prototype)
    this.physical.friction = 0.9
    this.physical.velocity.set(0, 0)
    this.zoom = 100
    this.field = null
    this.target = null
    this.shock = 0
    this.diffX = 0
    this.diffY = 0
  }
  update () {
    if (!this.target) return
    this.updateShock()
    this.lookTarget()
    const posX = this.target.x + this.physical.velocity.x + this.diffX
    const posY = this.target.y + this.physical.velocity.y + this.diffY
    this.field.scale.x = this.zoom * 0.01
    this.field.scale.y = this.zoom * 0.01
    const x = this.getScrollPositon(settings.SCREEN_WIDTH, posX, this.field.width)
    const y = this.getScrollPositon(settings.SCREEN_HEIGHT, posY, this.field.height)
    this.field.setPosition(x, y)
  }
  setField (field) {
    this.field = field
    return this
  }
  setTarget (target) {
    this.target = target
    return this
  }
  updateShock () {
    if (this.shock > 0) {
      this.shock = Math.min(this.shock, 40)
      this.physical.velocity.x += Math.randint(-this.shock, this.shock)
      this.physical.velocity.y += Math.randint(-this.shock, this.shock)
      this.shock -= 2
    }
  }
  lookTarget () {
    const getTarget = () => {
      const tgt = this.target.targetGroup().find(v => v.inShotRange(this.target))
      if (tgt) return tgt
      return this.target.target
    }
    const target = getTarget()
    const getMax = () => {
      if (!target) return 80
      return this.target.inShotRange(target) ? 120 : 100
    }
    const max = getMax()
    if (this.zoom < max) {
      this.zoom += 2
    } else if (this.zoom > max) {
      this.zoom -= 2
    }
    const diffX = target ? (target.x - this.target.x) * 0.7 : this.target.cos * 200
    const diffY = target ? (target.y - this.target.y) * 0.7 : this.target.sin * 200
    this.diffX += Math.abs(diffX - this.diffX) > 10 ? Math.sign(diffX - this.diffX) * 10 : (diffX - this.diffX)
    this.diffY += Math.abs(diffY - this.diffY) > 10 ? Math.sign(diffY - this.diffY) * 10 : (diffY - this.diffY)
  }
  addShock (shock) {
    this.shock += shock
    return this
  }
  getScrollPositon (screenSize, playerPosition, fieldSize) {
    playerPosition *= this.zoom * 0.01
    fieldSize *= this.zoom * 0.01
    if (playerPosition < (screenSize / 2)) return 0
    if (playerPosition > fieldSize - (screenSize / 2)) return -fieldSize + screenSize
    return (screenSize / 2) - playerPosition
  }
  inVision (x, y) {
    x *= this.zoom * 0.01
    y *= this.zoom * 0.01
    x += this.field.x
    y += this.field.y
    const margin = 50
    return x >= -margin && y >= -margin && x <= settings.SCREEN_WIDTH + margin && y <= settings.SCREEN_HEIGHT + margin
  }
}
