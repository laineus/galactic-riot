import { settings } from '../config/variables'
import state from '../config/state'
import missions from '../mission/missions'
import MissionSelectItem from './MissionSelectItem'
import Cursor from './Cursor'
export default class MissionSelect extends phina.display.DisplayElement {
  constructor (scene, cancel) {
    super()
    Object.setPrototypeOf(this, MissionSelect.prototype)
    this.list = missions.map((mission, i) => new MissionSelectItem(mission).addChildTo(this).setPosition(0, i * 38))
    this.setPosition(settings.SCREEN_WIDTH_C - 200, 50)
    this.cursor = new Cursor(this.list, (current, other) => {
      current.active = true
      other.forEach(v => v.active = false)
    }, (current) => {
      state.mission = current.mission
      scene.exit('Game')
    }, cancel).addChildTo(this)
  }
}
