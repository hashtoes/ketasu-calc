import React, { FC, useState } from "react";
import "./App.css";
import { quizDriver } from "./libs/QuizDriver";
import { Quiz } from "./libs/Quiz";
import { nextRand } from "./libs/utils";
import classNames from "classnames";

const OPTION_SIZE = 4;
const useQuiz = () => {
  const [quiz, setQuiz] = useState<Quiz>(quizDriver.next());
  const [answerIdx, setAnswerIndex] = useState<number>(
    Math.floor(Math.random() * OPTION_SIZE)
  );
  const [toShowAnswer, setShowAnswer] = useState<boolean>(false);
  const next = () => {
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

const App: FC = () => {
  const { quiz, answerIdx, toShowAnswer, showAnswer, next } = useQuiz();

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
              setTimeout(next, 1000);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
