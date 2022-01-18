export const fromRightTopCornerAnimation = {
  initial: {
    scale: 0,
    originX: "100%",
    originY: 0,
  },
  animate: {
    scale: 1,
  },
};

export const fadeInFadeOutAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const fromRightAnimation = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

export const fromToptoBottomAnimation = {
  initial: {
    opacity: 0,
    y: -50,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 50,
  },
};

export const fromLeftToRightAnimation = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2,
    },
  },
  exit: {
    opacity: 0,
    x: "100vw",
  },
};

export const fromRightToLeftAnimation = {
  initial: {
    opacity: 0,
    x: "100vw",
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2,
    },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
  },
};

export const springyDropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stifness: 700,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};
