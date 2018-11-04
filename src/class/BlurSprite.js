import { colors } from '../config/variables'
import maskImage from '../utils/maskImage';
export default class BlurSprite extends phina.display.Sprite {
  constructor (image, color, blur = 7, width, height) {
    color = color || colors.blue
    super(maskImage.getImage(image, color), width, height)
    Object.setPrototypeOf(this, BlurSprite.prototype)
    this.blendMode = 'lighter'
    this.color = color
    this.blur = blur
    this.body = Sprite(image, width, height).addChildTo(this)
  }
  setImage (image, width, height) {
    super.setImage(image, width, height)
    this.body.setImage(image, width, height)
  }
  draw (canvas) {
    canvas.context.save()
    canvas.context.shadowBlur = this.blur
    canvas.context.shadowColor = this.color
    super.draw(canvas)
    canvas.context.restore()
  }
}
