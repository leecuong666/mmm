export const getRandomNum = (min: number = 1, max: number = 10) => {
  return fixedNum(Math.random() * (max - min) + min, 0);
};

export const fixedNum = (num: number, fixed: number = 2) => {
  return Number(num.toFixed(fixed));
};
