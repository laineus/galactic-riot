import variables from '../config/variables'
import settings from '../config/settings'
const WIDTH = 1920
const HEIGHT = 1440
export default {
  superClass: 'DisplayScene',
  init (option) {
    this.superInit(option)
    this.backgroundColor = variables.color.black
    this.field = Sprite('map').addChildTo(this).setOrigin(0, 0)
    this.field.player = Player().addChildTo(this.field).setScreen(this).setField(this.field)
  },
  update () {
    this.updateCamera()
  },
  updateCamera () {
    if (this.field.player) {
      const x = this.getScrollPositon(settings.SCREEN_WIDTH, this.field.player.x, WIDTH)
      const y = this.getScrollPositon(settings.SCREEN_HEIGHT, this.field.player.y, HEIGHT)
      this.field.setPosition(x, y)
    }
  },
  getScrollPositon (screenSize, playerPosition, fieldSize) {
    if (playerPosition < (screenSize / 2)) return 0
    if (playerPosition > fieldSize - (screenSize / 2)) return -fieldSize + screenSize
    return (screenSize / 2) - playerPosition
  }
}
