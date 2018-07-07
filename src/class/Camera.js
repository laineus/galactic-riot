import settings from '../config/settings'
export default {
  superClass: 'DisplayElement',
  zoom: 1.0,
  field: null,
  target: null,
  init (field, target) {
    this.superInit()
    this.setField(field)
    this.setTarget(target)
  },
  update (app) {
    if (this.target) {
      if (app.keyboard.getKey('X') && this.zoom < 1.5) {
        this.zoom += 0.1
      } else if (!app.keyboard.getKey('X') && this.zoom > 1.0) {
        this.zoom -= 0.1
      }
      this.field.scale.x = this.zoom
      this.field.scale.y = this.zoom
      const x = this.getScrollPositon(settings.SCREEN_WIDTH, this.target.x, this.field.width)
      const y = this.getScrollPositon(settings.SCREEN_HEIGHT, this.target.y, this.field.height)
      this.field.setPosition(x, y)
    }
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
