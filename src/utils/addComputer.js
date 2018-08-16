import state from '../config/state'
const cos = (rotation, distance) => Math.cos(Math.degToRad(rotation)) * distance
const sin = (rotation, distance) => Math.sin(Math.degToRad(rotation)) * distance
const initElement = (x, y, r, type, hash) => {
  const obj = (type === 'player') ? Player() : Computer().setType(type)
  obj.setPosition(x, y).setRotation(r)
  obj.hash = hash
}
export default (x, y, r, type, count) => {
  const subType = type === 'player' ? 'friend' : type
  if (x === null) x = Math.randint(0, state.field.width)
  if (y === null) y = Math.randint(0, state.field.height)
  if (r === null) r = Math.radToDeg(Math.atan2(state.player.y - y, state.player.x - x))
  if (x < 0) x += state.field.width
  if (y < 0) y += state.field.height
  const hash = Math.randint(1000000, 9999999)
  switch (count) {
    case 1:
      initElement(x, y, r, type, hash)
      break
    case 2:
      initElement(x + cos(r - 90, 50), y + sin(r - 90, 50), r, type, hash)
      initElement(x + cos(r + 90, 50), y + sin(r + 90, 50), r, subType, hash)
      break
    case 3:
      initElement(x, y, r, type, hash)
      initElement(x + cos(r - 135, 100), y + sin(r - 135, 100), r, subType, hash)
      initElement(x + cos(r + 135, 100), y + sin(r + 135, 100), r, subType, hash)
      break
    case 4:
      initElement(x, y, r, type, hash)
      initElement(x + cos(r - 135, 100), y + sin(r - 135, 100), r, subType, hash)
      initElement(x + cos(r + 135, 100), y + sin(r + 135, 100), r, subType, hash)
      initElement(x + cos(r + 180, 140), y + sin(r + 180, 140), r, subType, hash)
      break
    case 5:
      initElement(x, y, r, type, hash)
      initElement(x + cos(r - 135, 100), y + sin(r - 135, 100), r, subType, hash)
      initElement(x + cos(r + 135, 100), y + sin(r + 135, 100), r, subType, hash)
      initElement(x + cos(r - 135, 200), y + sin(r - 135, 200), r, subType, hash)
      initElement(x + cos(r + 135, 200), y + sin(r + 135, 200), r, subType, hash)
      break
    case 6:
      initElement(x, y, r, type, hash)
      initElement(x + cos(r - 135, 100), y + sin(r - 135, 100), r, subType, hash)
      initElement(x + cos(r + 135, 100), y + sin(r + 135, 100), r, subType, hash)
      initElement(x + cos(r - 135, 200), y + sin(r - 135, 200), r, subType, hash)
      initElement(x + cos(r + 135, 200), y + sin(r + 135, 200), r, subType, hash)
      initElement(x + cos(r + 180, 140), y + sin(r + 180, 140), r, subType, hash)
      break
  }
}
