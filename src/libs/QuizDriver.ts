import { NumberRepresentation } from "./NumberRepresentation";
import { getNumberSuite } from "./NumberSuiteFactory";
import { Operator, operators } from "./Operator";
import { getQuiz } from "./Quiz";
import { chooseRand, nextRand } from "./utils";

class QuizDriver {
  public next() {
    const op = chooseRand(Object.values<Operator>(operators));
    const suiteType = chooseRand(["japanese", "english"] as const);
    const { repr, conv } = getNumberSuite(suiteType);
    const { num: num1, digit: firstDigit } = this.nextNum(
      repr,
      op.firstOperandDigitGenerator()
    );
    const { num: num2 } = this.nextNum(
      repr,
      op.secondOperandDigitGenerator(firstDigit)
    );
    const quizType = chooseRand([
      "TextText",
      "NumericText",
      "TextNumeric",
    ] as const);
    return getQuiz(op, num1, num2, conv, quizType);
  }

  private nextNum(
    repr: (head: number, digit: number) => NumberRepresentation,
    digitGenerator: () => number
  ) {
    const head = chooseRand([1, 2, 5]);
    const digit = digitGenerator();
    return {
      num: repr(head, digit),
      digit,
    };
  }
}

export const quizDriver = new QuizDriver();
