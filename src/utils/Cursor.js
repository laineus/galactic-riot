export default class Cursor {
  constructor (list, onUpdate, onEnter, onCancel, index = 0) {
    this.list = list
    this.onUpdate = onUpdate
    this.onEnter = onEnter
    this.onCancel = onCancel
    this.index = index
    this.delay = 0
    this.firstFrame = true
  }
  get index () {
    return this._index
  }
  set index (i) {
    if (i < 0) i = this.list.length - 1
    if (i >= this.list.length) i = 0
    this._index = i
    if (this.onUpdate) this.onUpdate(this.current, this.other)
  }
  get current () {
    return this.list[this.index]
  }
  get other () {
    return this.list.filter((_, i) => i !== this.index)
  }
  update (key) {
    if (this.firstFrame) return this.firstFrame = false
    if (key.getKeyDown('up') || (this.delay === 0 && key.getKey('up'))) {
      this.index--
      this.delay = key.getKeyDown('up') ? 8 : 2
    }
    if (key.getKeyDown('down') || (this.delay === 0 && key.getKey('down'))) {
      this.index++
      this.delay = key.getKeyDown('down') ? 8 : 2
    }
    if (this.delay > 0) this.delay--
    if (key.getKeyDown('Z') && this.onEnter) this.onEnter(this.current)
    if (key.getKeyDown('X') && this.onCancel) this.onCancel()
  }
}
