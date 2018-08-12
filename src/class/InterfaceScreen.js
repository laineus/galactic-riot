import { colors } from '../config/variables'
import state from '../config/state'
import maskImage from '../utils/maskImage'
export default {
  superClass: 'DisplayElement',
  init (option) {
    this.superInit(option)
    this.field = state.field
    this.radar()
  },
  radar () {
    if (!this.player) return
    const width = 160
    const height = 120
    const size = 0.05
    const option = { width: width, height: height, fill: colors.black_05, strokeWidth: 0, padding: 0 }
    const radar = RectangleShape(option).setPosition(20, 20).setOrigin(0, 0).addChildTo(this)
    radar.clip = canvas => canvas.beginPath().rect(0, 0, width, height)
    radar.area = RectangleShape({
      width: this.field.width * size,
      height: this.field.height * size,
      fill: 'transparent',
      stroke: colors.white,
      strokeWidth: 1,
      padding: 0
    }).setOrigin(0, 0).setPosition(width, height).addChildTo(radar)
    const me = maskImage.getSprite(this.player.imageName, colors.blue).addChildTo(radar.area).setScale(0.03, 0.03)
    me.update = () => {
      me.setRotation(this.player.rotation)
      me.setPosition(this.player.x * size, this.player.y * size)
    }
    const addArc = (ctx, obj) => {
      ctx.beginPath()
      ctx.arc((obj.x * size), (obj.y * size), 1.5, 0, Math.PI*2, false)
      ctx.fill()
    }
    radar.area.update = () => {
      radar.area.setPosition(
        (this.player.x * -size) + (width / 2),
        (this.player.y * -size) + (height / 2)
      )
    }
    radar.area.draw = canvas => {
      radar.area.superMethod('draw', canvas)
      canvas.context.fillStyle = colors.green
      for (const obj of this.field.friend.children) {
        if (obj !== this.player) addArc(canvas.context, obj)
      }
      canvas.context.fillStyle = colors.pink
      for (const obj of this.field.enemy.children) {
        addArc(canvas.context, obj)
      }
    }
  }
}
