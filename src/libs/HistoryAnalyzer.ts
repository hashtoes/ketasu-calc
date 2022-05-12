import { countIf, sum, toPrecision } from "./utils";

type HistoryPoint = {
  time: number;
  isCorrect: boolean;
};

const splitToSession = (history: number[]) => {
  const SESSION_TIMEOUT = 300;
  const result: HistoryPoint[][] = [];
  if (history.length === 0) {
    return result;
  }
  let session: HistoryPoint[] = [
    {
      time: history[0],
      isCorrect: history[1] === 1,
    },
  ];
  let prevTime = history[0];
  for (let i = 2; i < history.length; i++) {
    if (history[i] - prevTime > SESSION_TIMEOUT) {
      result.push(session);
      prevTime = history[i];
      session = [
        {
          time: history[i],
          isCorrect: history[++i] === 1,
        },
      ];
      continue;
    }
    prevTime = history[i];
    session.push({
      time: history[i],
      isCorrect: history[++i] === 1,
    });
  }
  result.push(session);

  return result;
};

type Stat = {
  averageTime: number;
  correctRate: number;
  total: number;
};
const toThirdPrecision = toPrecision(3);

const getDefaultStats = (): Stat => ({
  averageTime: 0,
  correctRate: 0,
  total: 0,
});
const averageTimeAndCorrectRate = (session: HistoryPoint[]): Stat => {
  if (session.length < 2) {
    return getDefaultStats();
  }
  return {
    averageTime: toThirdPrecision(
      (session[session.length - 1].time - session[0].time) /
        (session.length - 1) /
        10
    ),
    correctRate: toThirdPrecision(
      countIf((p: HistoryPoint) => p.isCorrect)(session) / session.length
    ),
    total: session.length,
  };
};

export const calcAllStats = (
  history: number[]
): {
  allStats: Stat;
  currentStats: Stat;
} => {
  if (history.length < 4) {
    return {
      allStats: getDefaultStats(),
      currentStats: getDefaultStats(),
    };
  }
  const stats = splitToSession(history).map((session) =>
    averageTimeAndCorrectRate(session)
  );
  const sumElaspedTime = sum((e: Stat) => e.averageTime * (e.total - 1))(stats);
  const sumTotal = sum((e: Stat) => e.total)(stats);
  const correctTotal = sum((e: Stat) => e.correctRate * e.total)(stats);
  return {
    allStats: {
      averageTime: toThirdPrecision(sumElaspedTime / (sumTotal - stats.length)),
      correctRate: toThirdPrecision(correctTotal / sumTotal),
      total: sumTotal,
    },
    currentStats: stats[stats.length - 1],
  };
};
