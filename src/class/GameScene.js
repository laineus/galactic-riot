import variables from '../config/variables'
import settings from '../config/settings'
import state from '../config/state'
export default {
  superClass: 'DisplayScene',
  zoom: 1.0,
  init (option) {
    this.superInit(option)
    this.backgroundColor = variables.color.black
    // Field
    this.field = state.field = Sprite('map').addChildTo(this).setOrigin(0, 0)
    this.field.width = this.field.srcRect.width
    this.field.height = this.field.srcRect.height
    // Layer
    this.field.friend = DisplayElement().addChildTo(this.field)
    this.field.enemy = DisplayElement().addChildTo(this.field)
    this.field.bullet = DisplayElement().addChildTo(this.field)
    // Fighter
    this.field.player = Player()
    this.randomEnemy()
  },
  update (app) {
    this.updateCamera(app.keyboard)
  },
  updateCamera (key) {
    if (this.field.player) {
      if (key.getKey('X') && this.zoom < 1.5) {
        this.zoom += 0.1
      } else if (!key.getKey('X') && this.zoom > 1.0) {
        this.zoom -= 0.1
      }
      this.field.scale.x = this.zoom
      this.field.scale.y = this.zoom
      const x = this.getScrollPositon(settings.SCREEN_WIDTH, this.field.player.x, this.field.width)
      const y = this.getScrollPositon(settings.SCREEN_HEIGHT, this.field.player.y, this.field.height)
      this.field.setPosition(x, y)
    }
  },
  getScrollPositon (screenSize, playerPosition, fieldSize) {
    playerPosition *= this.zoom
    fieldSize *= this.zoom
    if (playerPosition < (screenSize / 2)) return 0
    if (playerPosition > fieldSize - (screenSize / 2)) return -fieldSize + screenSize
    return (screenSize / 2) - playerPosition
  },
  randomEnemy () {
    const type = ['friend', 'enemy'].pickup()
    if (this.field[type].children.length < 10) Computer().setType(type)
    setTimeout(() => this.randomEnemy(), Math.randint(1000, 3000))
  }
}
