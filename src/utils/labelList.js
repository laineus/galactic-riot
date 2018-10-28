import BlurText from '../class/BlurText'
export default (textArray, x, y, parent, options = {}) => {
  const margin = options.margin || 20
  return textArray.map((text, i) => {
    return new BlurText(text, options.fontSize || 14, options).addChildTo(parent).setPosition(x, y + (i * margin))
  })
}
