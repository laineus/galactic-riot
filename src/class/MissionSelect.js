import { settings } from '../config/variables'
import state from '../config/state'
import missions from '../config/missions'
import MissionSelectItem from './MissionSelectItem'
import Cursor from './Cursor'
export default class MissionSelect extends phina.display.DisplayElement {
  constructor (scene, cancel) {
    super()
    Object.setPrototypeOf(this, MissionSelect.prototype)
    const itemHeight = 38
    this.list = this.activeMissions.map((mission, i) => new MissionSelectItem(mission).addChildTo(this).setPosition(0, i * itemHeight))
    this.setPosition(settings.SCREEN_WIDTH_C - 200, settings.SCREEN_HEIGHT_C - this.activeMissions.length * itemHeight / 2)
    this.cursor = new Cursor(this.list, (current, other) => {
      current.active = true
      other.forEach(v => v.active = false)
    }, (current) => {
      state.mission = current.mission
      scene.exit('Game')
    }, cancel).addChildTo(this)
  }
  get activeMissions () {
    return missions.filter(m => m.index <= (state.save.mission + 1))
  }
}
