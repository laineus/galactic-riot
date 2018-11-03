import state from '../config/state'
import intToString from '../utils/intToString'
import saveData from '../utils/saveData'
import Modal from './Modal'
const BASE_PRICE = 100
const ADD_PRICE = 20
export default class MilitaryForce {
  constructor (callback) {
    const price = BASE_PRICE + (state.save.amount * ADD_PRICE)
    if (state.save.money >= price) {
      const en = `Are you sure you want to expand ?\n$ ${intToString(price)}`
      const ja = '自軍を拡張しますか？ 拡張／中止'
      new Modal(en, ja, ['Expand', 'Cancel'], button => {
        if (button.name === 'Expand') {
          state.save.money -= price
          state.save.amount++
          saveData.save()
        }
        callback()
      }, callback, 1)
    } else {
      new Modal('Money is not enough.', 'お金が足りません', null, callback, callback)
    }
  }
}
