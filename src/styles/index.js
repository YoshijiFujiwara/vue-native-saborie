import * as colors from './colors'
import { MISTAKE_COLOR } from './colors'
import { SHOULDDONE_COLOR } from './colors'
import { TIME_COLOR } from './colors'

export default {
  headerOne: {
    fontWeight: 'bold',
    fontSize: 23
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 3,
    fontSize: 17
  },
  centerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    padding: 20
  },

  // background系
  bgSecondary: {
    backgroundColor: colors.SECONDARY_COLOR
  },
  bgPrimary: {
    backgroundColor: colors.PRIMARY_COLOR
  },
  bgWhite: {
    backgroundColor: colors.WHITE_COLOR
  },
  bgAccent: {
    backgroundColor: colors.ACCENT_COLOR
  },
  bgWarning: {
    backgroundColor: colors.WARNING_COLOR
  },

  // text系
  textPrimary: {
    color: colors.PRIMARY_COLOR
  },
  textAccent: {
    color: colors.ACCENT_COLOR
  },
  textGray: {
    color: colors.GRAY_COLOR
  },
  textWhiteGray: {
    color: colors.WHITEGRAY_COLOR
  },
  textWhite: {
    color: colors.WHITE_COLOR
  },
  textShouldDone: {
    color: colors.SHOULDDONE_COLOR
  },
  textMistake: {
    color: colors.MISTAKE_COLOR
  },
  textTime: {
    color: colors.TIME_COLOR
  },
  textExcuse: {
    color: colors.EXCUSE_COLOR
  },

  noBorderHeader: {
    borderBottomWidth: 0,
    backgroundColor: colors.WHITE_COLOR
  },
  noBorderTabUnderline: {
    borderBottomWidth: 0,
    backgroundColor: colors.WHITE_COLOR
  }
}

