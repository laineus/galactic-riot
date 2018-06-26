// https://cdn.rawgit.com/phi-jp/phina.js/v0.2.0/build/phina.js
import phina from 'phina.js'
import settings from './config/settings'
import assets from './config/assets'
import scenes from './config/scenes'
import components from './config/components'
phina.globalize()

for (const component of components) {
  phina.define(component.className, component.class)
}
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
