import Laser from './Laser'
export default class OnlineLaser extends Laser {
  constructor (parent, laser) {
    super(parent, laser)
    Object.setPrototypeOf(this, OnlineLaser.prototype)
  }
  hitCheck () {
    return
  }
}
