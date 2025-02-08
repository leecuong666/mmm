export const getRandomNum = (min: number = 1, max: number = 10) => {
  return Math.random() * (max - min) + min;
};
