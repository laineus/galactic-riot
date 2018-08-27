export default class Cursor extends phina.app.Element {
  constructor (list, onUpdate, onEnter, onCancel, vertical = true, index = 0) {
    super()
    Object.setPrototypeOf(this, Cursor.prototype)
    this.list = list
    this.onUpdate = onUpdate
    this.onEnter = onEnter
    this.onCancel = onCancel
    this.prev = vertical ? 'up' : 'left'
    this.next = vertical ? 'down' : 'right'
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
  update (app) {
    const key = app.keyboard
    if (this.firstFrame) return this.firstFrame = false
    if (key.getKeyDown(this.prev) || (this.delay === 0 && key.getKey(this.prev))) {
      this.index--
      this.delay = key.getKeyDown(this.prev) ? 8 : 2
    }
    if (key.getKeyDown(this.next) || (this.delay === 0 && key.getKey(this.next))) {
      this.index++
      this.delay = key.getKeyDown(this.next) ? 8 : 2
    }
    if (this.delay > 0) this.delay--
    if (key.getKeyDown('Z') && this.onEnter) this.onEnter(this.current)
    if (key.getKeyDown('X') && this.onCancel) this.onCancel()
  }
}
