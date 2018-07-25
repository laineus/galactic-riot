import state from '../config/state'
import maskImage from '../utils/maskImage'
export default {
  superClass: 'DisplayElement',
  init (option) {
    this.superInit(option)
    this.field = state.field
    this.lockon = maskImage.getSprite('circle', '#F31').addChildTo(this).setScale(0.2, 0.2)
    this.lockon.blendMode = 'lighter'
    this.lockon.alpha = 0
  },
  update (app) {
    if (!this.field.player) return
    if (this.field.player.hp > 0 && this.field.player.target) {
      this.lockon.x = this.field.player.target.x
      this.lockon.y = this.field.player.target.y
      this.lockon.alpha = 1
      this.lockon.rotation += 10
    } else {
      this.lockon.alpha = 0
    }
  }
}
