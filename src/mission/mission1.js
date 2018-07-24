const self = {
  count: 0,
  functions: [
    () => {
      console.log('first')
      return true
    },
    () => {
      self.count++
      console.log('second: ' + self.count)
      return self.count >= 100
    },
    () => {
      console.log('third')
      return true
    }
  ]
}
export default self
