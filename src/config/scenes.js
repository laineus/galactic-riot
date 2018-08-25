import LoadingScene from '../class/LoadingScene'
import TitleScene from '../class/TitleScene'
import GameScene from '../class/GameScene'
export default [
  {
    className: 'LoadingScene',
    label: 'Loading',
    init: option => new LoadingScene(option)
  },
  {
    className: 'TitleScene',
    label: 'Title',
    init: option => new TitleScene(option)
  },
  {
    className: 'GameScene',
    label: 'Game',
    init: option => new GameScene(option)
  }
]
