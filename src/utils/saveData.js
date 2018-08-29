import state from '../config/state'
class SaveData {
  load () {
    const json = localStorage.getItem('save')
    if (!json) return
    try {
      const data = JSON.parse(json)
      state.save = data
      return data
    } catch (e) {
      console.log('セーブデータが破損しています')
      this.remove()
    }
  }
  save () {
    const json = JSON.stringify(state.save)
    return localStorage.setItem('save', json)
  }
  remove () {
    localStorage.removeItem('save')
  }
}
export default new SaveData
