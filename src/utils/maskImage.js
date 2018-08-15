class MaskImage {
  constructor () {
    this.assets = {}
  }
  getName (imageKey, color) {
    const maskName = `${imageKey}_${color}`
    if (this.assets[maskName]) return maskName
    this.saveMask(imageKey, color, maskName)
    return maskName
  }
  getSprite (imageKey, color) {
    return Sprite(this.getName(imageKey, color))
  }
  getImage (imageKey, color) {
    return AssetManager.get('image', this.getName(imageKey, color))
  }
  saveMask (imageKey, color, maskName) {
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

    AssetManager.set('image', maskName, texture)
    this.assets[maskName] = true
  }
}
export default new MaskImage
