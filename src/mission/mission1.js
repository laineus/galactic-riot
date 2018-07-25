import state from '../config/state'
const self = {
  count: 0,
  functions: [
    () => {
      Player().setPosition(100, 100)
      Number(10).times(() => Computer().setType('enemy'))
      return true
    },
    () => {
      return true
    }
  ]
}
export default self
