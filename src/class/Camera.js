import settings from '../config/settings'
export default {
  superClass: 'DisplayElement',
  zoom: 1.0,
  field: null,
  target: null,
  shock: 0,
  init (field, target) {
    this.superInit()
    this.setField(field)
    this.setTarget(target)
    this.physical.friction = 0.9
    this.physical.velocity.set(0, 0)
  },
  update (app) {
    if (this.shock > 0) {
      this.physical.velocity.x += Math.randint(-this.shock, this.shock)
      this.physical.velocity.y += Math.randint(-this.shock, this.shock)
      this.shock -= 2
    }
    const posX = this.target.x + this.physical.velocity.x
    const posY = this.target.y + this.physical.velocity.y
    if (this.target) {
      if (app.keyboard.getKey('X') && this.zoom < 1.5) {
        this.zoom += 0.1
      } else if (!app.keyboard.getKey('X') && this.zoom > 1.0) {
        this.zoom -= 0.1
      }
      this.field.scale.x = this.zoom
      this.field.scale.y = this.zoom
      const x = this.getScrollPositon(settings.SCREEN_WIDTH, posX, this.field.width)
      const y = this.getScrollPositon(settings.SCREEN_HEIGHT, posY, this.field.height)
      this.field.setPosition(x, y)
    }
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
    playerPosition *= this.zoom
    fieldSize *= this.zoom
    if (playerPosition < (screenSize / 2)) return 0
    if (playerPosition > fieldSize - (screenSize / 2)) return -fieldSize + screenSize
    return (screenSize / 2) - playerPosition
  }
}
