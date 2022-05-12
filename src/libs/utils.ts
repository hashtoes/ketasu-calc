export const nextRand = (n: number) => {
  return Math.floor(Math.random() * n);
};
export const chooseRand = <T>(arr: readonly T[]) => {
  return arr[nextRand(arr.length)];
};
export const countIf =
  <T>(func: (e: T) => boolean) =>
  (arr: T[]) => {
    return arr.reduce((acc, curr) => {
      if (func(curr)) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

export const sum =
  <T>(func: (e: T) => number) =>
  (arr: T[]) => {
    return arr.reduce((acc, curr) => {
      return acc + func(curr);
    }, 0);
  };

export const toPrecision = (precision: number) => (num: number) => {
  return Number(num.toPrecision(precision));
};
