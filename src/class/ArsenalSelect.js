import { colors } from '../config/variables'
import Box from './Box'
import BlurLabel from './BlurLabel'
export default class ArsenalSelect extends phina.display.DisplayElement {
  constructor (select, cancel) {
    super()
    Object.setPrototypeOf(this, ArsenalSelect.prototype)
    this.select = select
    this.cancel = cancel
    this.list = [
      { name: 'Fighter', move: [{ key: 'right', index: 1 }, { key: 'down', index: 3 }] },
      { name: 'Main Weapon', move: [{ key: 'left', index: 0 }, { key: 'down', index: 2 }] },
      { name: 'Sub Weapon', move: [{ key: 'up', index: 1 }, { key: 'left', index: 0 }, { key: 'down', index: 3 }] },
      { name: 'Military Force', move: [{ key: 'up', index: 0 }, { key: 'down', index: 4 }] },
      { name: 'Exit', move: [{ key: 'up', index: 3 }] }
    ]
    this.list[0].image = this.fighter().addChildTo(this).setPosition(120, 120)
    this.list[0].image.active = true
    this.list[1].image = this.main().addChildTo(this).setPosition(315, 55)
    this.list[2].image = this.sub().addChildTo(this).setPosition(315, 185)
    this.list[3].image = this.force().addChildTo(this).setPosition(185, 280)
    this.list[4].image = this.exit().addChildTo(this).setPosition(185, 336)
    this.listIndex = 0
  }
  update (app) {
    this.move(app.keyboard)
    if (app.keyboard.getKeyDown('Z')) this.select(this.list[this.listIndex])
    if (app.keyboard.getKeyDown('X')) this.cancel()
  }
  move (key) {
    this.list[this.listIndex].move.forEach(move => {
      if (key.getKeyDown(move.key)) {
        this.listIndex = move.index
        this.list.forEach((r, i) => r.image && (r.image.active = this.listIndex === i))
      }
    })
  }
  fighter () {
    const item = new Box(240, 240)
    item.image = Sprite('f1_f').setScale(0.5, 0.5).setRotation(270).addChildTo(item)
    return item
  }
  main () {
    const item = new Box(110, 110)
    item.image = Sprite('f1_f').setScale(0.25, 0.25).setRotation(270).addChildTo(item)
    return item
  }
  sub () {
    const item = new Box(110, 110)
    item.image = Sprite('f1_f').setScale(0.25, 0.25).setRotation(270).addChildTo(item)
    return item
  }
  force () {
    const item = new Box(370, 40)
    item.image = new BlurLabel({
      text: 'Military Force',
      fontFamily: 'aldrich',
      fontSize: 15,
      fill: colors.white
    })
    return item
  }
  exit () {
    const item = new Box(110, 32)
    item.image = new BlurLabel({
      text: 'Exit',
      fontFamily: 'aldrich',
      fontSize: 15,
      fill: colors.white
    }).addChildTo(item)
    return item
  }
}
