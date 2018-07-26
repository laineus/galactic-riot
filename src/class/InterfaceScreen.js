import variables from '../config/variables'
import state from '../config/state'
export default {
  superClass: 'DisplayElement',
  init (option) {
    this.superInit(option)
    this.field = state.field
    this.radar()
  },
  radar () {
    const width = 160
    const height = 120
    const size = 0.05
    const option = { width: width, height: height, fill: variables.color.black_05, strokeWidth: 0, padding: 0 }
    const radar = RectangleShape(option).setPosition(20, 20).setOrigin(0, 0).addChildTo(this)
    radar.clip = canvas => canvas.beginPath().rect(0, 0, width, height)
    radar.area = RectangleShape({
      width: this.field.width * size,
      height: this.field.height * size,
      fill: 'transparent',
      stroke: variables.color.white,
      strokeWidth: 1,
      padding: 0
    }).setOrigin(0, 0).setPosition(width, height).addChildTo(radar)
    const addArc = (ctx, obj) => {
      ctx.beginPath()
      ctx.arc((obj.x * size), (obj.y * size), 1.5, 0, Math.PI*2, false)
      ctx.fill()
    }
    radar.area.update = () => {
      if (!this.field.player) return
      radar.area.setPosition(
        (this.field.player.x * -size) + (width / 2),
        (this.field.player.y * -size) + (height / 2)
      )
    }
    radar.area.draw = canvas => {
      radar.area.superMethod('draw', canvas)
      for (const obj of this.field.friend.children) {
        canvas.context.fillStyle = obj === this.field.player ? variables.color.blue : variables.color.green
        addArc(canvas.context, obj)
      }
      canvas.context.fillStyle = variables.color.pink
      for (const obj of this.field.enemy.children) {
        addArc(canvas.context, obj)
      }
    }
  }
}
