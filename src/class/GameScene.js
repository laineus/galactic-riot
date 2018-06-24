import variables from '../config/variables'
import settings from '../config/settings'
export default {
  superClass: 'DisplayScene',
  init (option) {
    this.superInit(option)
    this.backgroundColor = variables.color.black
    this.field = Sprite('map').addChildTo(this).setOrigin(0, 0)
    this.field.width = this.field.srcRect.width
    this.field.height = this.field.srcRect.height
    this.field.player = Player().addChildTo(this.field).setField(this.field)
  },
  update () {
    this.updateCamera()
  },
  updateCamera () {
    if (this.field.player) {
      const x = this.getScrollPositon(settings.SCREEN_WIDTH, this.field.player.x, this.field.width)
      const y = this.getScrollPositon(settings.SCREEN_HEIGHT, this.field.player.y, this.field.height)
      this.field.setPosition(x, y)
    }
  },
  getScrollPositon (screenSize, playerPosition, fieldSize) {
    if (playerPosition < (screenSize / 2)) return 0
    if (playerPosition > fieldSize - (screenSize / 2)) return -fieldSize + screenSize
    return (screenSize / 2) - playerPosition
  }
}
