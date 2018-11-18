import FlyingElement from './FlyingElement'
import SlicedSprite from './SlicedSprite'
import state from '../config/state'
export default class Laser extends FlyingElement {
  constructor (parent, laser) {
    super()
    Object.setPrototypeOf(this, Laser.prototype)
    if (state.field.camera.inVision(parent.x, parent.y)) {
      SoundManager.play(parent.player ? 'laser2' : 'laser1')
    }
    this.laser = laser
    this.shooter = parent
    this.type = parent.type
    this.target = parent.target
    this.frame = 0
    if (!this.shooter.shotCount) this.shooter.shotCount = 0
    if (this.laser.name !== 'Tailgun') this.shooter.shotCount++
    this.setSpeed(this.laser.speed + (parent.player ? 10 : 0))
    this.setMobility(10)
    this.setRotation(this.laser.name === 'Tailgun' ? parent.rotation + 180 : parent.rotation)
    if (this.laser.name === 'Tailgun') {
      this.setPosition(
        parent.x + (parent.cos * -60),
        parent.y + (parent.sin * -60)
      )
    } else if (this.laser.twinDiff) {
      const add = this.shooter.shotCount % 2 === 0 ? -25 : 25
      this.setPosition(
        parent.x + (Math.cos(Math.degToRad(this.rotation + add)) * this.laser.twinDiff),
        parent.y + (Math.sin(Math.degToRad(this.rotation + add)) * this.laser.twinDiff)
      )
    } else {
      this.setPosition(
        parent.x + (parent.cos * 60),
        parent.y + (parent.sin * 60)
      )
    }
    const body = new SlicedSprite('laser', 1, 3, parent.colorIndex).setScale(0.2, 0.2)
    body.blendMode = 'lighter'
    this.setBody(body)
    this.addChildTo(parent.field.bullet)
    // flash
    const flash = new SlicedSprite('laser_flash', 1, 3, parent.colorIndex).setScale(0, 0).setPosition(this.x, this.y).setRotation(this.rotation).addChildTo(parent.field.object)
    flash.blendMode = 'lighter'
    flash.tweener.to({ scaleX: 0.08, scaleY: 0.08 }, 16).to({ scaleX: 0, scaleY: 0 }, 16).wait(32).call(() => flash.remove())
  }
  update (app) {
    super.update(app)
    this.move(false, true)
    this.hitCheck()
    if (this.laser.isHoming) this.homing()
    this.frame++
  }
  hitCheck () {
    for (const tgt of this.targetGroup()) {
      if (this.distanceDiff(tgt) < 30) {
        if (state.field.camera.inVision(tgt.x, tgt.y)) {
          SoundManager.play(tgt.player ? 'hit2' : 'hit1')
        }
        tgt.damage(this.laser.damage, this.shooter)
        this.remove()
        break
      }
    }
  }
  homing () {
    if (!this.target || this.frame > 60) return
    const degDiff = this.degreeDiff(this.target)
    if (Math.abs(degDiff) > 1) {
      this.turn((degDiff > 0 && degDiff < 180) || degDiff < -180 ? 1 : -1, Math.abs(degDiff))
    }
  }
}
