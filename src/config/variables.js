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
  white_05: 'rgba(255, 255, 255, 0.5)',
  gray: 'rgb(127, 127, 127)',
  gray_05: 'rgba(127, 127, 127, 0.5)',
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
    width: 3000,
    height: 3000
  }
}
export const fighters = {
  f1_f: {
    img: 'f1_f.png',
    speed: 7
  }
}
export const mainWeapons = [
  { name: 'assult', image: 'laser', damage: 35, delay: 5, speed: 50, isHoming: false, twinDiff: false },
  { name: 'gatling', image: 'laser', damage: 15, delay: 3, speed: 50, isHoming: false, twinDiff: 15 },
  { name: 'twin', image: 'laser', damage: 10, delay: 7, speed: 50, isHoming: false, twinDiff: 25 },
  { name: 'sniper', image: 'laser', damage: 60, delay: 10, speed: 50, isHoming: false, twinDiff: false }
]
export const subWeapons = [
  { name: 'boost', delay: 20 },
  { name: 'tailgun', image: 'laser', damage: 20, delay: 5, speed: 50, isHoming: false, twinDiff: false }
]
