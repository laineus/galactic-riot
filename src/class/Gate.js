import state from '../config/state'
export default class Gate extends phina.display.DisplayElement {
  constructor (fieldName, x, y) {
    super()
    Object.setPrototypeOf(this, Gate.prototype)
    this.name = 'Gate'
    this.fieldName = fieldName
    this.fieldX = x
    this.fieldY = y
    this.active = false
    this.blur1 = Sprite('gate_blur').addChildTo(this).setScale(1.5, 1.5)
    this.blur1.blendMode = 'lighter'
    this.gate = Sprite('gate').addChildTo(this).setScale(0.33, 0.33)
    this.blur2 = Sprite('gate_blur').addChildTo(this).setScale(1, 1)
    this.blur2.blendMode = 'lighter'
  }
  update () {
    if (!state.player) return
    if (state.player.distanceDiff(this) < 50 && !this.active) {
      state.player.rotation = this.rotation
      this.blur1.tweener.to({ scaleX: 50 }, 200, 'easeInQuad')
      this.blur2.tweener.to({ scaleX: 50 }, 200, 'easeInQuad')
      state.interface.lightMask.tweener.to({ alpha: 1 }, 200, 'easeInQuad').to({ alpha: 0 }, 300, 'easeOutQuad').play()
      setTimeout(() => {
        state.player.x = this.fieldX
        state.player.y = this.fieldY
        state.field.friend.children.forEach(v => {
          v.rotation = this.rotation
          v.x = this.fieldX + Math.randint(-100, 100)
          v.y = this.fieldY + Math.randint(-100, 100)
        })
        state.field.setField(this.fieldName)
        state.interface.initRadar(state.field, state.player)
        this.remove()
      }, 200)
      this.active = true
    }
  }
}
