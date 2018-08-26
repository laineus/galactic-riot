import { colors } from '../config/variables'
import ArsenalSelect from './ArsenalSelect'
export default class ArsenalScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, ArsenalScene.prototype)
    this.backgroundColor = colors.black
    this.bg = Sprite('title').addChildTo(this).setOrigin(0, 0).setScale(0.75, 0.75)
    this.arsenal = new ArsenalSelect(current => this.select(current), () => this.cancel()).setPosition(295, 95).addChildTo(this)
  }
  select (current) {
    switch (current.name) {
      case 'Exit':
        this.cancel()
        break
    }
  }
  cancel () {
    this.exit('Title', { skip: 1 })
  }
}
