import { settings } from '../config/variables'
import state from '../config/state'
import missions from '../config/missions'
import MissionSelectItem from './MissionSelectItem'
import Cursor from './Cursor'
import Box from './Box'
import BlurText from './BlurText'
export default class MissionSelect extends phina.display.DisplayElement {
  constructor (scene, cancel) {
    super()
    Object.setPrototypeOf(this, MissionSelect.prototype)
    this.scene = scene
    this.cancel = cancel
    this.header = this.getHeader().addChildTo(this)
    this.content = this.getContent().addChildTo(this)
  }
  get activeMissions () {
    return missions.filter(m => m.index <= (state.save.mission + 1))
  }
  getContent () {
    const content = DisplayElement().setOrigin(0, 0)
    const itemHeight = 38
    content.list = this.activeMissions.map((mission, i) => new MissionSelectItem(mission).addChildTo(content).setPosition(0, i * itemHeight))
    content.setPosition(settings.SCREEN_WIDTH_C - 200, settings.SCREEN_HEIGHT_C - this.activeMissions.length * itemHeight / 2)
    content.cursor = new Cursor(content.list, (current, other) => {
      current.active = true
      other.forEach(v => v.active = false)
    }, (current) => {
      state.mission = current.mission
      this.scene.exit('Game')
    }, this.cancel).addChildTo(content)
    return content
  }
  getHeader () {
    const header = new Box(settings.SCREEN_WIDTH, 40).setOrigin(0, 0).setPosition(0, 20)
    header.title = new BlurText('Mission', 24).setOrigin(0, 0).setPosition(25, 0).addChildTo(header)
    return header
  }
}
