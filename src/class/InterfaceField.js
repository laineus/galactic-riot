import state from '../config/state'
import maskImage from '../utils/maskImage'
export default class InterfaceField extends phina.display.DisplayElement {
  constructor () {
    super()
    Object.setPrototypeOf(this, InterfaceField.prototype)
    this.lockon = maskImage.getSprite('circle', '#F31').addChildTo(this).setScale(0.2, 0.2)
    this.lockon.blendMode = 'lighter'
    this.lockon.alpha = 0
  }
  update () {
    if (!state.player) return
    if (state.player.hp > 0 && state.player.target) {
      this.lockon.x = state.player.target.x
      this.lockon.y = state.player.target.y
      this.lockon.alpha = 1
      this.lockon.rotation += 10
    } else {
      this.lockon.alpha = 0
    }
  }
}
