import { settings, colors, fighterFind, weaponFind, attachmentFind } from '../config/variables'
import state from '../config/state'
import intToString from '../utils/intToString'
import EquipSelect from './EquipSelect'
import MilitaryForce from './MilitaryForce'
import Box from './Box'
import BlurText from './BlurText'
import Text from './Text'
export default class ArsenalScene extends phina.display.DisplayScene {
  constructor (option) {
    super(option)
    Object.setPrototypeOf(this, ArsenalScene.prototype)
    this.backgroundColor = colors.black
    this.bg = Sprite('title').addChildTo(this).setOrigin(0, 0).setScale(0.75, 0.75)
    this.header = this.getHeader().addChildTo(this)
    this.content = this.getContent().addChildTo(this).setPosition(295, 95 + 20)
    this.sub = new Text('', 14).addChildTo(this).setPosition(settings.SCREEN_WIDTH_C, settings.SCREEN_HEIGHT - 30)
    this.setCursor()
  }
  close () {
    this.exit('Title', { skip: 1 })
  }
  getHeader () {
    const header = new Box(settings.SCREEN_WIDTH, 40).setOrigin(0, 0).setPosition(0, 20)
    header.title = new BlurText('Arsenal', 24).setOrigin(0, 0).setPosition(25, 0).addChildTo(header)
    header.budgetLabel = new BlurText('Budget :').setOrigin(1, 0).setPosition(settings.SCREEN_WIDTH - 150, 5).addChildTo(header)
    header.budgetValue = new BlurText().setOrigin(1, 0).setPosition(settings.SCREEN_WIDTH - 20, 5).addChildTo(header)
    header.budgetValue.update = () => header.budgetValue.text = `$ ${intToString(state.save.money)}`
    return header
  }
  getContent () {
    const content = DisplayElement().setOrigin(0, 0)
    content.list = [
      { name: 'Fighter', desc: 'Fighter select', key: 'fighter', move: [{ key: 'right', index: 1 }, { key: 'down', index: 3 }] },
      { name: 'Weapon', desc: 'Weapon select', key: 'weapon', move: [{ key: 'left', index: 0 }, { key: 'down', index: 2 }] },
      { name: 'Attachment', desc: 'Attachment select', key: 'attachment', move: [{ key: 'up', index: 1 }, { key: 'left', index: 0 }, { key: 'down', index: 3 }] },
      { name: 'Military Force', desc: 'Increase friend\'s fighter', key: 'amount', move: [{ key: 'up', index: 0 }, { key: 'down', index: 4 }] },
      { name: 'Exit', desc: 'Back to title menu', key: null, move: [{ key: 'up', index: 3 }] }
    ]
    content.list[0].image = this.getFighter(content.list[0]).addChildTo(content).setPosition(120, 120)
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
      if (app.keyboard.getKeyDown(move.key) && content.listIndex !== move.index) {
        content.listIndex = move.index
        this.setCursor()
      }
    })
    if (app.keyboard.getKeyDown('Z')) this.contentSelect(content, content.list[content.listIndex])
    if (app.keyboard.getKeyDown('X')) this.close()
  }
  setCursor () {
    this.content.list.forEach((r, i) => r.image && (r.image.active = this.content.listIndex === i))
    this.sub.text = this.content.list[this.content.listIndex].desc
  }
  contentSelect (content, current) {
    if (!current.key) {
      this.close()
    } else if (current.key === 'amount') {
      content.awake = false
      new MilitaryForce(() => content.awake = true)
    } else {
      content.awake = false
      new EquipSelect(current.key, () => content.awake = true).addChildTo(this)
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
      const fighter = fighterFind(state.save.fighter)
      item.image.setImage(fighter.img)
      item.label.text = fighter.name
    }
    item.label = new BlurText(fighter.name, 14).setOrigin(0, 0).setPosition(-115, -115).addChildTo(item)
    return item
  }
  getMain (label) {
    const item = new Box(110, 110)
    item.beforeId = state.save.weapon
    const weapon = weaponFind(state.save.weapon)
    item.image = Sprite(weapon.img).setScale(0.2, 0.2).setRotation(270).addChildTo(item)
    item.image.update = () => {
      if (item.beforeId === state.save.weapon) return
      item.beforeId = state.save.weapon
      const weapon = weaponFind(state.save.weapon)
      item.image.setImage(weapon.img)
      item.label.text = weapon.name
    }
    item.label = new BlurText(weapon.name, 12).setOrigin(0, 0).setPosition(-55, -55).addChildTo(item)
    return item
  }
  getSub (label) {
    const item = new Box(110, 110)
    item.beforeId = state.save.attachment
    const attach = attachmentFind(state.save.attachment)
    item.image = Sprite(attach ? attach.img : 'dummy').setScale(0.2, 0.2).setRotation(270).addChildTo(item)
    item.label = new BlurText(attach.name, 12).setOrigin(0, 0).setPosition(-55, -55).addChildTo(item)
    item.image.update = () => {
      if (item.beforeId === state.save.attachment) return
      item.beforeId = state.save.attachment
      const attach = attachmentFind(state.save.attachment)
      item.image.setImage(attach.img)
      item.label.text = attach.name
    }
    return item
  }
  getForce(label) {
    const item = new Box(370, 40)
    item.key = new BlurText(`${label.name} :`).setOrigin(0, 0.5).setPosition(-175, 0).addChildTo(item)
    item.value = new BlurText(state.save.amount).setOrigin(1, 0.5).setPosition(175, 0).addChildTo(item)
    item.value.update = () => item.value.text = state.save.amount
    return item
  }
  getExit(label) {
    const item = new Box(110, 32)
    item.image = new BlurText(label.name).addChildTo(item)
    return item
  }
}
