import { colors } from '../config/variables'
import maskImage from '../utils/maskImage'
const WIDTH = 160
const HEIGHT = 120
const SIZE = 0.05
export default class Radar extends phina.display.RectangleShape {
  constructor (field, player) {
    super({ width: WIDTH, height: HEIGHT, fill: colors.black_05, strokeWidth: 0, padding: 0 })
    Object.setPrototypeOf(this, Radar.prototype)
    const GATE_IMAGE = maskImage.getImage('gate', colors.white)
    this.clip = canvas => canvas.beginPath().rect(0, 0, WIDTH, HEIGHT)
    this.area = RectangleShape({
      width: field.width * SIZE,
      height: field.height * SIZE,
      fill: 'transparent',
      stroke: colors.white,
      strokeWidth: 1,
      padding: 0
    }).setOrigin(0, 0).setPosition(WIDTH, HEIGHT).addChildTo(this)
    this.area.me = maskImage.getSprite(player.imageName, colors.blue).addChildTo(this.area).setScale(0.03, 0.03)
    this.area.me.update = () => {
      this.area.me.setRotation(player.rotation)
      this.area.me.setPosition(player.x * SIZE, player.y * SIZE)
    }
    const addArc = (ctx, obj) => {
      ctx.beginPath()
      ctx.arc((obj.x * SIZE), (obj.y * SIZE), 1.5, 0, Math.PI*2, false)
      ctx.fill()
    }
    this.area.update = () => {
      this.area.setPosition(
        (player.x * -SIZE) + (WIDTH / 2),
        (player.y * -SIZE) + (HEIGHT / 2)
      )
    }
    this.area.draw = canvas => {
      this.area.superMethod('draw', canvas)
      canvas.context.fillStyle = colors.green
      field.friend.children.forEach(obj => { if (obj !== player) addArc(canvas.context, obj) })
      canvas.context.fillStyle = colors.pink
      field.enemy.children.forEach(obj => addArc(canvas.context, obj))
      field.object.children.forEach(obj => {
        if (obj.name === 'Gate') {
          const x = (obj.x * SIZE)
          const y = (obj.y * SIZE)
          canvas.context.save()
          canvas.context.translate(x, y)
          canvas.context.rotate(Math.degToRad(obj.rotation))
          canvas.context.drawImage(GATE_IMAGE.domElement, -7, -7, 14, 14)
          canvas.context.restore()
        }
      })
    }
  }
}
