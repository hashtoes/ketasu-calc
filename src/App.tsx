import React, { FC, useState } from "react";
import "./App.css";
import { quizDriver } from "./libs/QuizDriver";
import { Quiz } from "./libs/Quiz";
import { nextRand } from "./libs/utils";
import classNames from "classnames";
import { calcAllStats } from "./libs/HistoryAnalyzer";

const OPTION_SIZE = 4;
const TIMESTAMP_OFFSET = 16523170000;

const useQuiz = () => {
  const [quiz, setQuiz] = useState<Quiz>(quizDriver.next());
  const [answerIdx, setAnswerIndex] = useState<number>(
    Math.floor(Math.random() * OPTION_SIZE)
  );
  const [toShowAnswer, setShowAnswer] = useState<boolean>(false);

  const history = getHistory();

  const next = (correct: boolean) => () => {
    appendHistory(history, correct);
    setQuiz(quizDriver.next());
    setAnswerIndex(nextRand(OPTION_SIZE));
    setShowAnswer(false);
  };
  return {
    quiz,
    answerIdx,
    toShowAnswer,
    showAnswer: () => setShowAnswer(true),
    next,
  };
};

const getHistory = (): number[] => {
  const rawHistory = localStorage.getItem("history");
  if (!rawHistory) {
    return [];
  }
  return JSON.parse(rawHistory);
};
const appendHistory = (curHistory: number[], correct: boolean): void => {
  curHistory.push(Math.floor(Date.now() / 100) - TIMESTAMP_OFFSET);
  curHistory.push(correct ? 1 : 0);
  localStorage.setItem("history", JSON.stringify(curHistory));
};

const App: FC = () => {
  const { quiz, answerIdx, toShowAnswer, showAnswer, next } = useQuiz();
  const {
    allStats,
    currentStats,
  } = calcAllStats(getHistory());

  return (
    <div>
      <div>{quiz.getQuestion()}</div>
      <div>
        {quiz.options(answerIdx, OPTION_SIZE).map((option, idx) => (
          <button
            className={classNames({
              correct: toShowAnswer && answerIdx === idx,
            })}
            onClick={() => {
              showAnswer();
              setTimeout(next(answerIdx === idx), 200);
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <div>
        <div>current stats:</div>
        <div>averageTime: {currentStats.averageTime}</div>
        <div>correctRate: {currentStats.correctRate}</div>
        <div>total: {currentStats.total}</div>
      </div>
      <div>
        <div>all stats:</div>
        <div>averageTime: {allStats.averageTime}</div>
        <div>correctRate: {allStats.correctRate}</div>
        <div>total: {allStats.total}</div>
      </div>
      <button onClick={() => localStorage.removeItem("history")}>
        clear history
      </button>
    </div>
  );
};

export default App;
