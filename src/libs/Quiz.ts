import { NumberRepresentation } from "./NumberRepresentation";
import { Operator } from "./Operator";

export abstract class Quiz {
  constructor(
    protected op: Operator,
    protected num1: NumberRepresentation,
    protected num2: NumberRepresentation,
    private convert: (num: number) => string
  ) {}

  public abstract getQuestion(): string;

  public calc() {
    return this.op.calc(this.num1, this.num2);
  }

  public options(correctIdx: number, size: number) {
    const options: string[] = [];
    let num = this.calc() * 0.1 ** correctIdx;
    options.push(this.convert(num));
    for (let i = 1; i < size; i++) {
      num = num * 10;
      options.push(this.convert(num));
    }
    return options;
  }
}

class TextTextQuiz extends Quiz {
  public getQuestion() {
    return `${this.num1.toText()} ${this.op.toText()} ${this.num2.toText()}`;
  }
}

class NumericTextQuiz extends Quiz {
  public getQuestion() {
    return `${this.num1.toNumericText()} ${this.op.toText()} ${this.num2.toText()}`;
  }
}

class TextNumericQuiz extends Quiz {
  public getQuestion() {
    return `${this.num1.toText()} ${this.op.toText()} ${this.num2.toNumericText()}`;
  }
}

type QuizType = "TextText" | "NumericText" | "TextNumeric";
export const getQuiz = (
  op: Operator,
  num1: NumberRepresentation,
  num2: NumberRepresentation,
  convert: (num: number) => string,
  type: QuizType
): Quiz => {
  switch (type) {
    case "TextText":
      return new TextTextQuiz(op, num1, num2, convert);
    case "NumericText":
      return new NumericTextQuiz(op, num1, num2, convert);
    case "TextNumeric":
      return new TextNumericQuiz(op, num1, num2, convert);
  }
};
