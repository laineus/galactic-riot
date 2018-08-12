import { colors } from '../config/variables'
import state from '../config/state'
import maskImage from '../utils/maskImage'
export default {
  superClass: 'DisplayElement',
  init (option) {
    this.superInit(option)
    state.interface = this
  },
  setRadar (field, player) {
    if (this.radar) this.radar.remove()
    const width = 160
    const height = 120
    const size = 0.05
    const option = { width: width, height: height, fill: colors.black_05, strokeWidth: 0, padding: 0 }
    const radar = RectangleShape(option).setPosition(20, 20).setOrigin(0, 0).addChildTo(this)
    radar.clip = canvas => canvas.beginPath().rect(0, 0, width, height)
    radar.area = RectangleShape({
      width: field.width * size,
      height: field.height * size,
      fill: 'transparent',
      stroke: colors.white,
      strokeWidth: 1,
      padding: 0
    }).setOrigin(0, 0).setPosition(width, height).addChildTo(radar)
    const me = maskImage.getSprite(player.imageName, colors.blue).addChildTo(radar.area).setScale(0.03, 0.03)
    me.update = () => {
      me.setRotation(player.rotation)
      me.setPosition(player.x * size, player.y * size)
    }
    const addArc = (ctx, obj) => {
      ctx.beginPath()
      ctx.arc((obj.x * size), (obj.y * size), 1.5, 0, Math.PI*2, false)
      ctx.fill()
    }
    radar.area.update = () => {
      radar.area.setPosition(
        (player.x * -size) + (width / 2),
        (player.y * -size) + (height / 2)
      )
    }
    radar.area.draw = canvas => {
      radar.area.superMethod('draw', canvas)
      canvas.context.fillStyle = colors.green
      for (const obj of field.friend.children) {
        if (obj !== player) addArc(canvas.context, obj)
      }
      canvas.context.fillStyle = colors.pink
      for (const obj of field.enemy.children) {
        addArc(canvas.context, obj)
      }
    }
    this.radar = radar
  }
}
