import state from '../config/state'
export default () => {
  state.score.frame = 0
  state.score.kill = 0
  state.score.death = 0
  state.score.rescue = 0
  state.score.amount = state.save.amount
  state.score.progress = true
}
