export const nextRand = (n: number) => {
  return Math.floor(Math.random() * n);
};
export const chooseRand = <T>(arr: readonly T[]) => {
  return arr[nextRand(arr.length)];
};
