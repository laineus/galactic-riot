import state from '../config/state'
const cos = (rotation, distance) => Math.cos(Math.degToRad(rotation)) * distance
const sin = (rotation, distance) => Math.sin(Math.degToRad(rotation)) * distance
const initElement = (x, y, r, type) => (type === 'player' ? Player() : Computer().setType(type)).setPosition(x, y).setRotation(r)
export default (x, y, r, type, count) => {
  const subType = type === 'player' ? 'friend' : type
  if (x === null) x = Math.randint(0, state.field.width)
  if (y === null) y = Math.randint(0, state.field.height)
  if (r === null) r = Math.radToDeg(Math.atan2(state.player.y - y, state.player.x - x))
  if (x < 0) x += state.field.width
  if (y < 0) y += state.field.height
  switch (count) {
    case 1:
      initElement(x, y, r, type)
      break
    case 2:
      initElement(x + cos(r - 90, 50), y + sin(r - 90, 50), r, type)
      initElement(x + cos(r + 90, 50), y + sin(r + 90, 50), r, subType)
      break
    case 3:
      initElement(x, y, r, type)
      initElement(x + cos(r - 135, 100), y + sin(r - 135, 100), r, subType)
      initElement(x + cos(r + 135, 100), y + sin(r + 135, 100), r, subType)
      break
    case 4:
      initElement(x, y, r, type)
      initElement(x + cos(r - 135, 100), y + sin(r - 135, 100), r, subType)
      initElement(x + cos(r + 135, 100), y + sin(r + 135, 100), r, subType)
      initElement(x + cos(r + 180, 140), y + sin(r + 180, 140), r, subType)
      break
    case 5:
      initElement(x, y, r, type)
      initElement(x + cos(r - 135, 100), y + sin(r - 135, 100), r, subType)
      initElement(x + cos(r + 135, 100), y + sin(r + 135, 100), r, subType)
      initElement(x + cos(r - 135, 200), y + sin(r - 135, 200), r, subType)
      initElement(x + cos(r + 135, 200), y + sin(r + 135, 200), r, subType)
      break
    case 6:
      initElement(x, y, r, type)
      initElement(x + cos(r - 135, 100), y + sin(r - 135, 100), r, subType)
      initElement(x + cos(r + 135, 100), y + sin(r + 135, 100), r, subType)
      initElement(x + cos(r - 135, 200), y + sin(r - 135, 200), r, subType)
      initElement(x + cos(r + 135, 200), y + sin(r + 135, 200), r, subType)
      initElement(x + cos(r + 180, 140), y + sin(r + 180, 140), r, subType)
      break
  }
}
