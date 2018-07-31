import variables from '../config/variables'
export default (textArray, x, y, parent, options = {}) => {
  const margin = options.margin || 20
  const list = []
  for (const name of textArray) {
    list.push(
      BlurLabel({
        text: name,
        fontFamily: 'aldrich',
        fill: variables.color.white,
        fontSize: options.fontSize || 14,
        shadowBlur: 6,
        shadowColor: variables.color.blue
      }).addChildTo(parent).setPosition(x, y + (list.length * margin))
    )
  }
  return list
}
