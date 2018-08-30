import { settings, colors, fighterFind } from '../config/variables'
import state from '../config/state'
import intToString from '../utils/intToString'
import FighterSelect from './FighterSelect'
import Box from './Box'
import Text from './Text'
export default class ArsenalScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, ArsenalScene.prototype)
    this.backgroundColor = colors.black
    this.bg = Sprite('title').addChildTo(this).setOrigin(0, 0).setScale(0.75, 0.75)
    this.header = this.getHeader().addChildTo(this)
    this.content = this.getContent().addChildTo(this).setPosition(295, 95 + 20)
  }
  close () {
    this.exit('Title', { skip: 1 })
  }
  getHeader () {
    const header = new Box(settings.SCREEN_WIDTH, 40).setOrigin(0, 0).setPosition(0, 20)
    header.title = new Text('Arsenal', 24).setOrigin(0, 0).setPosition(25, 0).addChildTo(header)
    header.budgetLabel = new Text('Budget :').setOrigin(1, 0).setPosition(settings.SCREEN_WIDTH - 150, 5).addChildTo(header)
    header.budgetValue = new Text().setOrigin(1, 0).setPosition(settings.SCREEN_WIDTH - 20, 5).addChildTo(header)
    header.budgetValue.update = () => header.budgetValue.text = `$ ${intToString(state.save.money)}`
    return header
  }
  getContent () {
    const content = DisplayElement().setOrigin(0, 0)
    content.list = [
      { name: 'Fighter', move: [{ key: 'right', index: 1 }, { key: 'down', index: 3 }] },
      { name: 'Main Weapon', move: [{ key: 'left', index: 0 }, { key: 'down', index: 2 }] },
      { name: 'Sub Weapon', move: [{ key: 'up', index: 1 }, { key: 'left', index: 0 }, { key: 'down', index: 3 }] },
      { name: 'Military Force', move: [{ key: 'up', index: 0 }, { key: 'down', index: 4 }] },
      { name: 'Exit', move: [{ key: 'up', index: 3 }] }
    ]
    content.list[0].image = this.getFighter(content.list[0]).addChildTo(content).setPosition(120, 120)
    content.list[0].image.active = true
    content.list[1].image = this.getMain(content.list[1]).addChildTo(content).setPosition(315, 55)
    content.list[2].image = this.getSub(content.list[2]).addChildTo(content).setPosition(315, 185)
    content.list[3].image = this.getForce(content.list[3]).addChildTo(content).setPosition(185, 280)
    content.list[4].image = this.getExit(content.list[4]).addChildTo(content).setPosition(185, 336)
    content.listIndex = 0
    content.awake = true
    content.update = app => this.contentUpdate(app, content)
    return content
  }
  contentUpdate (app, content) {
    if (!content.awake) return
    content.list[content.listIndex].move.forEach(move => {
      if (app.keyboard.getKeyDown(move.key)) {
        content.listIndex = move.index
        content.list.forEach((r, i) => r.image && (r.image.active = content.listIndex === i))
      }
    })
    if (app.keyboard.getKeyDown('Z')) this.contentSelect(content, content.list[content.listIndex])
    if (app.keyboard.getKeyDown('X')) this.close()
  }
  contentSelect (content, current) {
    switch (current.name) {
      case 'Fighter':
        content.awake = false
        new FighterSelect(() => content.awake = true).addChildTo(this)
        break
      case 'Main Weapon':
      case 'Sub Weapon':
      case 'Military Force':
      case 'Exit':
        this.close()
        break
    }
  }
  getFighter (label) {
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
  getMain (label) {
    const item = new Box(110, 110)
    item.image = Sprite('f1_f').setScale(0.2, 0.2).setRotation(270).addChildTo(item)
    item.label = new Text(label.name, 12).setOrigin(0, 0).setPosition(-55, -55).addChildTo(item)
    return item
  }
  getSub (label) {
    const item = new Box(110, 110)
    item.image = Sprite('f1_f').setScale(0.2, 0.2).setRotation(270).addChildTo(item)
    item.label = new Text(label.name, 12).setOrigin(0, 0).setPosition(-55, -55).addChildTo(item)
    return item
  }
  getForce (label) {
    const item = new Box(370, 40)
    item.key = new Text(`${label.name} :`).setOrigin(0, 0.5).setPosition(-175, 0).addChildTo(item)
    item.value = new Text('50').setOrigin(1, 0.5).setPosition(175, 0).addChildTo(item)
    return item
  }
  getExit (label) {
    const item = new Box(110, 32)
    item.image = new Text(label.name).addChildTo(item)
    return item
  }
}
