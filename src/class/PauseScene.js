import { settings } from '../config/variables'
export default class PauseScene extends phina.display.DisplayScene {
  constructor (color) {
    super({ width: settings.SCREEN_WIDTH, height: settings.SCREEN_HEIGHT })
    Object.setPrototypeOf(this, PauseScene.prototype)
    if (color) this.backgroundColor = color
  }
}
