import { colors } from '../config/variables'
export default class Text extends phina.display.Label {
  constructor (text, size = 15, options = {}) {
    super(Object.assign({
      text: text ? text : '',
      fontFamily: 'aldrich',
      fontSize: size,
      fill: colors.white,
    }, options))
  }
}
