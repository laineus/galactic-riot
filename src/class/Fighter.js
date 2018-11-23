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
  get isActive () {
    return this.hp > 0
  }
  get energyCoefficient () {
    if (this === state.player) return 1
    if (this.type === 'friend') return 0.4
    return 0.2
  }
  setFighter (id) {
    this.fighter = fighterFind(id)
    this.setEnergy(this.fighter.energy * this.energyCoefficient)
    this.setMobilityAndSpeed()
    this.setBlur()
    this.setJet()
    const key = this.type === 'friend' ? 'img' : 'img2'
    this.setBody(Sprite(this.fighter[key]).setScale(0.2, 0.2))
    this.setImageName(this.fighter[key])
    return this
  }
  setMobilityAndSpeed () {
    this.setMobility(this.fighter.mobility + (this.attachmentId === 5 ? 2 : 0))
    this.setSpeed(this.fighter.speed + (this.attachmentId === 5 ? 3 : 0))
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
    this.setMobilityAndSpeed()
  }
  mainAction () {
    if (this.weaponDelay > 0 || !this.weapon || this.hp <= 1) return
    this.hp -= 1
    new Laser(this, this.weapon)
    if (this.weapon.name === 'Twin') new Laser(this, this.weapon)
    if (this.attachmentId === 3) new Laser(this, this.attachment)
    this.weaponDelay = this.maxWeaponDelay
  }
  get maxWeaponDelay () {
    return Math.round(this.weapon.delay * (this.type === 'enemy' ? 1.5 : 1))
  }
  get boostEnergy () {
    return this.attachmentId === 4 ? 25 : 50
  }
  boost () {
    if (this.turnBoost > 0 || this.hp <= this.boostEnergy) return
    this.hp -= this.boostEnergy
    this.stampBlur()
    this.turnBoost = 20
    if (state.field.camera.inVision(this.x, this.y)) SoundManager.play('boost')
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
    this.hp -= damage * (this.attachmentId === 2 ? 0.7 : 1)
    // target
    if (shooter === state.player && this.target !== shooter && this.target) state.score.rescue++
    this.target = shooter
    this.sameHash().forEach(obj => {
      if (!obj.target) obj.target = shooter
    })
    // death
    if (!this.isActive) {
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
