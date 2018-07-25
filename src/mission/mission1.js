import state from '../config/state'
const self = {
  count: 0,
  created () {
    Player().setPosition(100, 100)
  },
  functions: [
    () => {
      Number(10).times(() => Computer().setType('enemy'))
      Number(10).times(() => Computer().setType('friend'))
      return true
    },
    () => {
      return true
    }
  ]
}
export default self
