import FlyingElement from './FlyingElement'
import SlicedSprite from './SlicedSprite'
export default class Laser extends FlyingElement {
  constructor (parent, laser) {
    super()
    Object.setPrototypeOf(this, Laser.prototype)
    this.laser = laser
    this.shooter = parent
    this.type = parent.type
    this.target = parent.target
    if (!this.shooter.shotCount) this.shooter.shotCount = 0
    this.shooter.shotCount++
    this.setSpeed(this.laser.speed)
    this.setMobility(5)
    this.setRotation(this.laser.name === 'Tailgun' ? parent.rotation + 180 : parent.rotation)
    if (this.laser.name === 'Tailgun') {
      this.setPosition(
        parent.x + (parent.cos * -60),
        parent.y + (parent.sin * -60)
      )
    } else if (this.laser.twinDiff) {
      const add = this.shooter.shotCount % 2 === 0 ? -45 : 45
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
    if (this.laser.isHoming) homing()
  }
  hitCheck () {
    for (const tgt of this.targetGroup()) {
      if (this.distanceDiff(tgt) < 30) {
        tgt.damage(this.laser.damage, this.shooter)
        this.remove()
        break
      }
    }
  }
  homing () {
    if (!this.target) return
    const degDiff = this.degreeDiff(this.target)
    if (Math.abs(degDiff) > 1) {
      this.turn((degDiff > 0 && degDiff < 180) || degDiff < -180 ? 1 : -1)
    }
  }
}
