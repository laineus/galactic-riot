import { fighterFind, weaponFind, attachmentFind, colors } from '../config/variables'
import state from '../config/state'
import Laser from './Laser'
import FlyingElement from './FlyingElement'
import FighterBlur from './FighterBlur'
import maskImage from '../utils/maskImage'
export default class Fighter extends FlyingElement {
  constructor () {
    super()
    Object.setPrototypeOf(this, Fighter.prototype)
    this.weaponId = null
    this.weapon = null
    this.weaponDelay = 0
    this.attachmentId = null
    this.attachment = null
    this.attachmentDelay = 0
  }
  isActive () {
    return this.hp > 0
  }
  setFighter (id) {
    this.fighter = fighterFind(id)
    this.setEnergy(this === state.player ? this.fighter.energy : Math.round(this.fighter.energy / 3))
    this.setMobility(this.fighter.mobility)
    this.setSpeed(this.fighter.speed)
    this.setBlur()
    this.setJet()
    const key = this.type === 'friend' ? 'img' : 'img2'
    this.setBody(Sprite(this.fighter[key]).setScale(0.2, 0.2))
    this.setImageName(this.fighter[key])
  }
  setBlur () {
    this.blur = new FighterBlur(maskImage.getName(this.fighter.img3, colors[this.color]), this).setScale(0.25, 0.25).addChildTo(this)
  }
  setWeapon (id) {
    this.weaponId = id
    this.weapon = weaponFind(id)
  }
  setAttachment (id) {
    this.attachmentId = id
    this.attachment = attachmentFind(id)
  }
  mainAction () {
    if (this.weaponDelay > 0 || !this.weapon) return
    new Laser(this, this.weapon)
    if (this.weapon.name === 'Twin') new Laser(this, this.weapon)
    this.weaponDelay = this.weapon.delay
  }
  subAction () {
    if (this.attachmentDelay > 0 || !this.attachment) return
    switch (this.attachment.name) {
      case 'Booster':
        this.boost()
        break
      default:
        new Laser(this, this.attachment)
        break
    }
    this.attachmentDelay = this.attachment.delay
  }
  boost () {
    if (this.turnBoost > 0) return
    this.stampBlur()
    this.turnBoost = 20
  }
  stampBlur () {
    const blur = maskImage.getSprite(this.fighter.img3, colors[this.color])
                          .setPosition(this.x, this.y)
                          .setRotation(this.rotation)
                          .setScale(0.25, 0.25)
                          .addChildTo(state.field.object)
    blur.blendMode = 'lighter'
    blur.tweener.to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 250).wait(250).call(() => blur.remove())
  }
  damage (damage, shooter) {
    this.explosion(1)
    this.hp -= damage * (this.attachmentId === 2 ? 0.5 : 1)
    // target
    if (shooter === state.player && this.target !== shooter && this.target) state.score.rescue++
    this.target = shooter
    this.sameHash().forEach(obj => {
      if (!obj.target) obj.target = shooter
    })
    // death
    if (!this.isActive()) {
      if (this.type === 'friend') state.score.death++
      if (shooter === state.player) state.score.kill++
      this.dead()
    }
  }
  dead () {
    this.explosion(5, 25)
    this.targetGroup().forEach(tgt => {
      if (tgt.target === this) tgt.target = null
    })
    this.sameGroup().forEach(tgt => {
      if (tgt.subTarget === this) tgt.subTarget = null
    })
    this.bullets().forEach(tgt => {
      if (tgt.target === this) tgt.target = null
    })
    this.remove()
    return this
  }
}
