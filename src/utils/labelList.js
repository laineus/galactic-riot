import { colors } from '../config/variables'
import BlurLabel from '../class/BlurLabel'
export default (textArray, x, y, parent, options = {}) => {
  const margin = options.margin || 20
  return textArray.map((text, i) => {
    return new BlurLabel({
      text: text,
      fontFamily: 'aldrich',
      fill: colors.white,
      fontSize: options.fontSize || 14,
      shadowBlur: 6,
      shadowColor: colors.blue
    }).addChildTo(parent).setPosition(x, y + (i * margin))
  })
}
