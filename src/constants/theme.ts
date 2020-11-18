import colors from './colors';

export const hex2rgba = (hex: string, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export default {
  background: {
    hex: colors.green.darker,
    rgba: (alpha: number) => {
      return hex2rgba(colors.green.darker, alpha);
      // return `rgba(0,31,27,${alpha})`;
    },
  },
  white: {
    hex: colors.white.normal,
    rgba: (alpha: number) => {
      return hex2rgba(colors.white.normal, alpha);
    },
  },
  dark: {
    hex: colors.green.dark,
    rgba: (alpha: number) => {
      return hex2rgba(colors.green.dark, alpha);
    },
  },
  disabled: {
    hex: colors.gray.normal,
    rgba: (alpha: number) => {
      return hex2rgba(colors.gray.normal, alpha);
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
  pill: colors.blue.hawkes,
  willBuy: colors.green.normal,
  willBuyLater: colors.purple.normal,
  willNotBuyLater: colors.yellow.normal,
  willNotBuy: colors.orange.normal,
  opaque: colors.gray.dark,
  charcoal: colors.gray.charcoal,
  opaqueLight: colors.gray.lightgrey,
  transparent: 'transparent',
  black: 'black',
  opaqueText: {
    hex: colors.gray.opaque,
    rgba: (alpha: number) => {
      return hex2rgba(colors.gray.opaque, alpha);
    },
  },
  gray: {
    hex: colors.gray.light,
    rgba: (alpha: number) => {
      return hex2rgba(colors.gray.light, alpha);
    },
  },
};
