import { colors } from '../config/variables'
import state from '../config/state'
import Text from './Text'
import BlurText from './BlurText'
export default class MissionSelectItem extends phina.display.RectangleShape {
  constructor (mission) {
    super({
      width: 400,
      height: 32,
      fill: colors.black_05,
      stroke: null,
      strokeWidth: 2,
      padding: 0
    })
    Object.setPrototypeOf(this, MissionSelectItem.prototype)
    this.active = false
    this.setOrigin(0, 0)
    new BlurText(mission.name, 15).addChildTo(this).setOrigin(0, 0.5).setPosition(10, 16)
    if (mission.index > 0 && mission.index <= state.save.mission) {
      new Text('Clear', 12, { fill: colors.yellow }).addChildTo(this).setOrigin(1, 0.5).setPosition(390, 16)
    }
    this.mission = mission
  }
  update () {
    const color = this.active ? colors.blue : 'transparent'
    this.stroke = color
    this.children.forEach(v => v.shadowColor = color)
  }
}
