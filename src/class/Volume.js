import SlicedSprite from './SlicedSprite'
import { settings, colors } from '../config/variables'
import Text from './Text'
import state from '../config/state'
import saveData from '../utils/saveData'
export default class Volume extends phina.display.DisplayElement {
  constructor () {
    super()
    Object.setPrototypeOf(this, Volume.prototype)
    this.setPosition(settings.SCREEN_WIDTH - 50, 25)
    this.icon = new SlicedSprite('volume', 2, 1, 1).addChildTo(this).setScale(0.2, 0.2)
    this.icon.alpha = 0.5
    this.label = new Text('', 10, { fill: colors.gray }).addChildTo(this).setPosition(0, 23)
    this.apply()
  }
  update (app) {
    if (app.keyboard.getKeyDown('C')) this.active = !this.active
  }
  apply () {
    this.icon.index = this.active ? 1 : 2
    this.label.text = this.active ? '[C] Sound off' : '[C] Sound on'
    Sound.volume = this.active ? 1 : 0
  }
  get active () {
    return state.save.sound
  }
  set active (bool) {
    state.save.sound = bool
    saveData.save()
    this.apply()
  }
}
