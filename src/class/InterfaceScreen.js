import variables from '../config/variables'
import state from '../config/state'
export default {
  superClass: 'DisplayElement',
  init (option) {
    this.superInit(option)
    this.field = state.field
    this.width = 160
    this.height = 120
    this.size = 0.05
    this.map = RectangleShape({ width: this.width, height: this.height, fill: variables.color.black_05, strokeWidth: 0, padding: 0 })
      .addChildTo(this)
      .setPosition(20, 20)
      .setScale(1, 1)
      .setOrigin(0, 0)
    this.map.clip = canvas => canvas.beginPath().rect(0, 0, this.width, this.height)
    this.map.field = RectangleShape({
      width: this.field.width * this.size,
      height: this.field.height * this.size,
      fill: 'transparent',
      stroke: variables.color.white,
      strokeWidth: 1,
      padding: 0
    }).addChildTo(this.map).setOrigin(0, 0)
    this.map.player = CircleShape({ radius: 2, fill: variables.color.white, strokeWidth: 0, padding: 0 })
      .addChildTo(this.map)
      .setPosition(this.width / 2, this.height / 2)
  },
  update (app) {
    this.map.field.setPosition(
      (this.field.player.x * -this.size) + (this.width / 2),
      (this.field.player.y * -this.size) + (this.height / 2)
    )
  }
}
