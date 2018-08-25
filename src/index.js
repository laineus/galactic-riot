// https://cdn.rawgit.com/phi-jp/phina.js/v0.2.0/build/phina.js
import phina from 'phina.js'
import { settings } from './config/variables'
import assets from './config/assets'
import scenes from './config/scenes'
phina.globalize()

scenes.forEach(scene => phina.register(scene.className, scene.init))

phina.main(() => {
  const game = GameApp({
    title: settings.GAME_TITLE,
    width: settings.SCREEN_WIDTH,
    height: settings.SCREEN_HEIGHT,
    startLabel: scenes[1].label,
    scenes: scenes,
    assets: assets,
    fps: settings.FPS,
    fit: FIT
  })
  document.getElementById(settings.DOM_ID).appendChild(game.domElement)
  game.run()
})
