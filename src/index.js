// https://cdn.rawgit.com/phi-jp/phina.js/v0.2.0/build/phina.js
import phina from 'phina.js'
import { settings } from './config/variables'
import assets from './config/assets'
import scenes from './config/scenes'
import components from './config/components'
import LoadingScene from './class/LoadingScene'
import TitleScene from './class/TitleScene'
import GameScene from './class/GameScene'
phina.globalize()

components.forEach(component => phina.define(component.className, component.class))
phina.register('LoadingScene', option => new LoadingScene(option))
phina.register('TitleScene', option => new TitleScene(option))
phina.register('GameScene', option => new GameScene(option))

phina.main(() => {
  const game = GameApp({
    title: settings.GAME_TITLE,
    width: settings.SCREEN_WIDTH,
    height: settings.SCREEN_HEIGHT,
    startLabel: scenes[0].label,
    scenes: scenes,
    assets: assets,
    fps: settings.FPS,
    fit: FIT
  })
  document.getElementById(settings.DOM_ID).appendChild(game.domElement)
  game.run()
})
