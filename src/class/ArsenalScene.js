import { colors } from '../config/variables'
import ArsenalSelect from './ArsenalSelect'
export default class ArsenalScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, ArsenalScene.prototype)
    this.backgroundColor = colors.black
    this.bg = Sprite('title').addChildTo(this).setOrigin(0, 0).setScale(0.75, 0.75)
    this.arsenalSelect = new ArsenalSelect(current => this.select(current), () => this.back()).addChildTo(this)
  }
  select (current) {
    switch (current.label.text) {
      case 'Exit':
        this.back()
        break
    }
  }
  back () {
    this.exit('Title', { skip: 1 })
  }
}
