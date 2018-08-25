import { settings, colors } from '../config/variables'
import state from '../config/state'
export default class InterfaceScreen extends phina.display.DisplayElement {
  constructor () {
    super()
    Object.setPrototypeOf(this, InterfaceScreen.prototype)
    state.interface = this
    this.lightMask = RectangleShape({
      width: settings.SCREEN_WIDTH,
      height: settings.SCREEN_HEIGHT,
      fill: colors.white,
      strokeWidth: 0,
      padding: 0
    }).setOrigin(0, 0).addChildTo(this)
    this.lightMask.alpha = 0
    this.lightMask.blendMode = 'lighter'
  }
  initRadar (field, player) {
    if (this.radar) this.radar.remove()
    this.radar = Radar(field, player).setPosition(20, 20).setOrigin(0, 0).addChildTo(this)
  }
}
