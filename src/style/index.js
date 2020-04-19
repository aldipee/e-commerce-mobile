import { StyleSheet } from 'react-native'
import colors from '../config/colors'

const style = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parentBlue: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.SECOND_BLUE,
  },
})

export default style
