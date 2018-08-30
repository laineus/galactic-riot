import state from '../config/state';
import intToString from '../utils/intToString'
import saveData from '../utils/saveData'
import Modal from './Modal'
const PRICE = 500
export default class MilitaryForce {
  constructor (callback) {
    if (state.save.money >= PRICE) {
      new Modal(`Are you sure you want to expand ?\n$ ${intToString(PRICE)}`, ['Expand', 'Cancel'], button => {
        if (button.name === 'Expand') {
          state.save.money -= PRICE
          state.save.amount++
          saveData.save()
        }
        callback()
      }, callback)
    } else {
      new Modal('Money is not enough.', null, callback, callback)
    }
  }
}
