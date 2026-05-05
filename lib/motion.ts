export const easeLuxury = [0.22, 1, 0.36, 1]; // smooth & premium

export const duration = {
  slow: 1.2,
  medium: 0.8,
  fast: 0.5,
};

export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.medium,
      ease: easeLuxury,
    },
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: duration.medium,
      ease: easeLuxury,
    },
  },
};