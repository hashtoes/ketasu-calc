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
    const num1 = this.nextNum(repr);
    const num2 = this.nextNum(repr, op);
    const quizType = chooseRand(["TextText", "NumericText", "TextNumeric"] as const);
    return getQuiz(op, num1, num2, conv, quizType);
  }

  private nextNum(
    repr: (head: number, digit: number) => NumberRepresentation,
    op?: Operator
  ) {
    const head = chooseRand([1, 2, 5]);
    const digit = nextRand(op?.constrainSecondOperand() ? 4 : 14);
    return repr(head, digit);
  }
}

export const quizDriver = new QuizDriver();
