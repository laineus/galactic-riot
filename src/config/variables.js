export const settings = {
  GAME_TITLE: 'GALACTIC RIOT',
  DOM_ID: 'game',
  SCREEN_WIDTH: 960,
  SCREEN_HEIGHT: 540,
  get SCREEN_WIDTH_C () { return this.SCREEN_WIDTH / 2 },
  get SCREEN_HEIGHT_C () { return this.SCREEN_HEIGHT / 2 },
  FPS: 30
}
export const colors = {
  black: '#000',
  black_05: 'rgba(0, 0, 0, 0.5)',
  white: '#FFF',
  blue: '#0cfcfc',
  green: '#53f623',
  pink: '#fc027d'
}
export const fields = {
  sublatant_1: {
    width: 6000,
    height: 4000
  },
  sublatant_2: {
    width: 1000,
    height: 1000
  }
}
export const fighters = {
  f1_f: {
    img: 'f1_f.png',
    speed: 7
  }
}
export const lasers = {
  assult: { name: 'assult', image: 'laser', damage: 35, delay: 5, speed: 50, isHoming: false, twinDiff: false },
  gatling: { name: 'gatling', image: 'laser', damage: 15, delay: 3, speed: 50, isHoming: false, twinDiff: 15 },
  twin: { name: 'twin', image: 'laser', damage: 10, delay: 7, speed: 50, isHoming: false, twinDiff: 25 },
  sniper: { name: 'sniper', image: 'laser', damage: 60, delay: 10, speed: 50, isHoming: false, twinDiff: false },
  tailgun: { name: 'tailgun', image: 'laser', damage: 20, delay: 5, speed: 50, isHoming: false, twinDiff: false }
}
