import state from '../config/state'
class SaveData {
  load () {
    const json = localStorage.getItem('save')
    if (!json) return
    try {
      const data = JSON.parse(json)
      state.data = data
    } catch (e) {
      console.log('セーブデータが破損しています')
    }
  }
  save () {
    const json = JSON.stringify(state.data)
    return localStorage.setItem('save', json)
  }
}
export default new SaveData
