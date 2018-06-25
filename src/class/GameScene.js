import variables from '../config/variables'
import settings from '../config/settings'
import state from '../config/state'
export default {
  superClass: 'DisplayScene',
  zoom: 0,
  init (option) {
    this.superInit(option)
    this.backgroundColor = variables.color.black
    this.field = state.field = Sprite('map').addChildTo(this).setOrigin(0, 0)
    this.field.width = this.field.srcRect.width
    this.field.height = this.field.srcRect.height
    this.field.player = Player().addChildTo(this.field)
    this.field.enemy = DisplayElement().addChildTo(this.field)
    this.field.bullet = DisplayElement().addChildTo(this.field)
    this.randomEnemy()
  },
  update (app) {
    this.updateCamera(app.keyboard)
  },
  updateCamera (key) {
    if (this.field.player) {
      if (key.getKey('X') && this.zoom < 100) {
        this.zoom += 25
      } else if (!key.getKey('X') && this.zoom > 0) {
        this.zoom -= 25
      }
      const x = this.getScrollPositon(settings.SCREEN_WIDTH, this.field.player.x + (this.field.player.cos * this.zoom), this.field.width)
      const y = this.getScrollPositon(settings.SCREEN_HEIGHT, this.field.player.y  + (this.field.player.sin * this.zoom), this.field.height)
      this.field.setPosition(x, y)
    }
  },
  getScrollPositon (screenSize, playerPosition, fieldSize) {
    if (playerPosition < (screenSize / 2)) return 0
    if (playerPosition > fieldSize - (screenSize / 2)) return -fieldSize + screenSize
    return (screenSize / 2) - playerPosition
  },
  randomEnemy () {
    if (this.field.enemy.children.length < 10) Enemy().addChildTo(this.field.enemy)
    setTimeout(() => this.randomEnemy(), Math.randint(3000, 5000))
  }
}
