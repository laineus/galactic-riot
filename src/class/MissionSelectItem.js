import { colors } from '../config/variables'
import BlurLabel from './BlurLabel'
export default {
  superClass: 'RectangleShape',
  active: false,
  init (mission) {
    this.superInit({
      width: 400,
      height: 32,
      fill: colors.black_05,
      stroke: null,
      strokeWidth: 2,
      padding: 0
    })
    this.setOrigin(0, 0)
    new BlurLabel({
      text: mission.name,
      fontFamily: 'aldrich',
      fontSize: 15,
      fill: colors.white
    }).addChildTo(this).setOrigin(0, 0).setPosition(10, 0)
    this.mission = mission
  },
  update () {
    const color = this.active ? colors.blue : 'transparent'
    this.stroke = color
    this.children.forEach(v => v.shadowColor = color)
  }
}
