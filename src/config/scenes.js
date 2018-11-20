import LoadingScene from '../class/LoadingScene'
import TitleScene from '../class/TitleScene'
import ArsenalScene from '../class/ArsenalScene'
import GameScene from '../class/GameScene'
import OnlineScene from '../class/OnlineScene'
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
    className: 'ArsenalScene',
    label: 'Arsenal',
    init: option => new ArsenalScene(option)
  },
  {
    className: 'GameScene',
    label: 'Game',
    init: option => new GameScene(option)
  },
  {
    className: 'OnlineScene',
    label: 'Online',
    init: option => new OnlineScene(option)
  }
]
