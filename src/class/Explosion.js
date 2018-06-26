import state from '../config/state'
export default {
  superClass: 'DisplayElement',
  init (x, y) {
    this.superInit()
    this.addChildTo(state.field)
    this.setPosition(x, y)
    this.explosion()
    setTimeout(() => this.remove(), 1000)
  },
  explosion () {
    Array('#444', '#D30', '#EA0', '#FBA').forEach((color, i) => {
      this.maskImage('smoke', color, `smoke_${color}`)
      const range = 50 - (i * 12)
      Number(5).times(() => {
        const sprite = Sprite(`smoke_${color}`)
        .addChildTo(this)
        .setRotation(Math.randint(0, 360))
        .setScale(Math.random() + 1 - (i / 3))
        .tweener.by({
          x: Math.randint(-range, range),
          y: Math.randint(-range, range),
          alpha: -1
        }, i ? 700 : 1500, 'easeOutCirc')
        if (i) sprite.blendMode = 'lighter'
      })
    })
  },
  maskImage(imageKey, color, distKey) {
    const original = AssetManager.get('image', imageKey).domElement
    const base = DisplayScene({
      width: original.width,
      height: original.height,
      backgroundColor: color
    })

    const originalSprite = Sprite(imageKey).addChildTo(base).setOrigin(0, 0)
    originalSprite.blendMode = 'destination-in'
    base._render()

    const texture = Texture()
    texture.domElement = base.canvas.domElement
    if (distKey) AssetManager.set('image', distKey, texture)
    return texture
  }
}