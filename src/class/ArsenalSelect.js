import { fighterFind } from '../config/variables'
import state from '../config/state'
import Box from './Box'
import Text from './Text'
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
    this.list[0].image = this.fighter(this.list[0]).addChildTo(this).setPosition(120, 120)
    this.list[0].image.active = true
    this.list[1].image = this.main(this.list[1]).addChildTo(this).setPosition(315, 55)
    this.list[2].image = this.sub(this.list[2]).addChildTo(this).setPosition(315, 185)
    this.list[3].image = this.force(this.list[3]).addChildTo(this).setPosition(185, 280)
    this.list[4].image = this.exit(this.list[4]).addChildTo(this).setPosition(185, 336)
    this.listIndex = 0
    this.start()
  }
  start () {
    this.awake = true
  }
  stop () {
    this.awake = false
  }
  update (app) {
    if (!this.awake) return
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
  fighter (label) {
    const item = new Box(240, 240)
    item.beforeId = state.save.fighter
    const fighter = fighterFind(state.save.fighter)
    item.image = Sprite(fighter.img).setScale(0.5, 0.5).setRotation(270).addChildTo(item)
    item.image.update = () => {
      if (item.beforeId === state.save.fighter) return
      item.beforeId = state.save.fighter
      item.image.setImage(fighterFind(state.save.fighter).img)
    }
    item.label = new Text(label.name, 14).setOrigin(0, 0).setPosition(-115, -115).addChildTo(item)
    return item
  }
  main (label) {
    const item = new Box(110, 110)
    item.image = Sprite('f1_f').setScale(0.2, 0.2).setRotation(270).addChildTo(item)
    item.label = new Text(label.name, 12).setOrigin(0, 0).setPosition(-55, -55).addChildTo(item)
    return item
  }
  sub (label) {
    const item = new Box(110, 110)
    item.image = Sprite('f1_f').setScale(0.2, 0.2).setRotation(270).addChildTo(item)
    item.label = new Text(label.name, 12).setOrigin(0, 0).setPosition(-55, -55).addChildTo(item)
    return item
  }
  force (label) {
    const item = new Box(370, 40)
    item.key = new Text(`${label.name} :`).setOrigin(0, 0.5).setPosition(-175, 0).addChildTo(item)
    item.value = new Text('50').setOrigin(1, 0.5).setPosition(175, 0).addChildTo(item)
    return item
  }
  exit (label) {
    const item = new Box(110, 32)
    item.image = new Text(label.name).addChildTo(item)
    return item
  }
}
