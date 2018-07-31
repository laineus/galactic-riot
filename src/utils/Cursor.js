export default class Cursor {
  constructor (list, onUpdate, onEnter, onCancel) {
    this.list = list
    this.onUpdate = onUpdate
    this.onEnter = onEnter
    this.onCancel = onCancel
    this.index = 0
  }
  get index () {
    return this._index
  }
  set index (i) {
    if (i < 0 || i >= this.list.length) return
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
    if (key.getKeyDown('up')) this.index--
    if (key.getKeyDown('down')) this.index++
    if (key.getKeyDown('Z') && this.onEnter) this.onEnter(this.current)
    if (key.getKeyDown('X') && this.onCancel) this.onCancel()
  }
}
