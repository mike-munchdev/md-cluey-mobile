import colors from './colors';

export default {
  background: {
    hex: colors.white.normal,
  },
  dark: {
    hex: colors.green.dark,
    rgba: (alpha: number) => {
      return `rgba(0,31,27,${alpha})`;
    },
  },
  light: colors.green.light,
  text: colors.white.normal,
  button: colors.green.light,
  buttonText: colors.white.normal,
  buttonBorder: colors.green.dark,
  buttonBackground: colors.green.dark,
  buttonTransparentBackground: 'transparent',
  buttonTransparentText: colors.white.normal,
  buttonTransparentBorder: colors.green.dark,
  disabledText: colors.gray.normal,
  successText: colors.green.normal,
  facebookBlue: colors.blue.facebook,
  googleBlue: colors.blue.google,
  errorText: colors.red.normal,
};
