export const toNumericText = (num: number) => {
  return num.toLocaleString();
};

const findEntry = <T extends [number, string]>(map: readonly T[], query: number): T => {
  for (let i = 0; i < map.length; i++) {
    if (map[i][0] <= query) {
      return map[i];
    }
  }
  throw new Error(`Should not reach here -- query: ${query}`);
};

export const headAndDigit = (num: number): [number, number] => {
  const head = Number(num.toString().charAt(0));
  const digit = Math.round(Math.log(num/head) / Math.log(10));
  return [head, digit];
}

export const toText =
  <T extends [number, string]>(map: readonly T[]) =>
  (head: number, digit: number) => {
    const digitEntry = findEntry(map, digit);
    return `${head * 10 ** (digit - digitEntry[0])} ${digitEntry[1]}`;
  };
