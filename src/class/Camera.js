import settings from '../config/settings'
export default {
  superClass: 'DisplayElement',
  zoom: 100,
  field: null,
  target: null,
  shock: 0,
  diffX: 0,
  diffY: 0,
  init (field, target) {
    this.superInit()
    this.setField(field)
    this.setTarget(target)
    this.physical.friction = 0.9
    this.physical.velocity.set(0, 0)
  },
  update (app) {
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
  },
  updateShock () {
    if (this.shock > 0) {
      this.physical.velocity.x += Math.randint(-this.shock, this.shock)
      this.physical.velocity.y += Math.randint(-this.shock, this.shock)
      this.shock -= 2
    }
  },
  lookTarget () {
    const getMax = () => {
      if (!this.target.target) return 80
      return this.target.inShotRange(this.target.target) ? 120 : 100
    }
    const max = getMax()
    if (this.zoom < max) {
      this.zoom += 4
    } else if (this.zoom > max) {
      this.zoom -= 4
    }
    const diffX = this.target.target ? (this.target.target.x - this.target.x) * 0.7 : 0
    const diffY = this.target.target ? (this.target.target.y - this.target.y) * 0.9 : 0
    this.diffX += Math.sign(diffX - this.diffX)
    this.diffY += Math.sign(diffY - this.diffY)
  },
  addShock (shock) {
    this.shock += shock
    return
  },
  setField (field) {
    this.field = field
    return
  },
  setTarget (target) {
    this.target = target
    return
  },
  getScrollPositon (screenSize, playerPosition, fieldSize) {
    playerPosition *= this.zoom * 0.01
    fieldSize *= this.zoom * 0.01
    if (playerPosition < (screenSize / 2)) return 0
    if (playerPosition > fieldSize - (screenSize / 2)) return -fieldSize + screenSize
    return (screenSize / 2) - playerPosition
  }
}
