export const moveUpAndFadeIn = {
  from: {
    left: 0,
    top: 200,
    opacity: 0,
  },
  to: {
    left: 0,
    top: 60,
    opacity: 1,
  },
};

export const moveDownAndFadeOut = {
  from: {
    top: 60,
    opacity: 1,
    left: 0,
  },
  to: {
    top: 200,
    opacity: 0,
    left: 0,
  },
};

export const searchViewGetOutOfTheWay = {
  from: {
    left: 0,
    opacity: 0,
  },
  to: {
    left: -5000,
    opacity: 0,
  },
};

export const fadeOutAndGrow = {
  from: {
    opacity: 1,
    height: 550,
    width: 550,
    left: 0,
    top: 140,
  },
  to: {
    opacity: 0,
    height: 2050,
    width: 2050,
    left: -500,
    top: -300,
  },
};

export const getOutOfTheWay = {
  from: {
    opacity: 0,
    left: -500,
  },
  to: {
    opacity: 0,
    left: -5000,
  },
};

export const fadeInAndShrink = {
  from: {
    opacity: 0,
    height: 2050,
    width: 2050,
    left: -500,
    top: -300,
  },
  to: {
    opacity: 1,
    height: 550,
    width: 550,
    left: 0,
    top: 140,
  },
};

export const buttonViewAnimateOut = {
  from: {
    opacity: 0,
    left: 0,
  },
  to: {
    opacity: 0,
    left: -5000,
  },
};

export const fadeIn = {
  from: {
    left: 0,
    opacity: 0,
  },
  to: {
    left: 0,
    opacity: 1,
  },
};

export const fadeOut = {
  from: {
    left: 0,
    opacity: 1,
  },
  to: {
    left: 0,
    opacity: 0,
  },
};
