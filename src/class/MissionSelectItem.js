import variables from '../config/variables'
export default {
  superClass: 'RectangleShape',
  active: false,
  init (mission) {
    this.superInit({
      width: 400,
      height: 40,
      fill: variables.color.black_05,
      stroke: null,
      strokeWidth: 2,
      padding: 0
    })
    this.setOrigin(0, 0)
    BlurLabel({
      text: mission.name,
      fontFamily: 'aldrich',
      fontSize: 15,
      fill: variables.color.white
    }).addChildTo(this).setOrigin(0, 0).setPosition(10, 5)
  },
  update () {
    const color = this.active ? variables.color.blue : 'transparent'
    this.stroke = color
    this.children.forEach(v => v.shadowColor = color)
  }
}
