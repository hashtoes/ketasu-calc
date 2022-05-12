import { NumberRepresentation } from "./NumberRepresentation";
import { nextRand } from "./utils";

const MAX_DIGIT = 14;

export interface Operator {
  toText(): string;
  calc(num1: NumberRepresentation, num2: NumberRepresentation): number;
  firstOperandDigitGenerator(): () => number;
  secondOperandDigitGenerator(firstDigit: number): () => number;
}

class Multiply implements Operator {
  public toText() {
    return "*";
  }

  public calc(num1: NumberRepresentation, num2: NumberRepresentation) {
    return num1.value() * num2.value();
  }

  public firstOperandDigitGenerator(): () => number {
    const MIN_DIGIT = 2;
    return () => nextRand(MAX_DIGIT - MIN_DIGIT, MIN_DIGIT);
  }

  public secondOperandDigitGenerator(firstDigit: number): () => number {
    const MIN_DIGIT = 2;
    return () => nextRand(MAX_DIGIT - MIN_DIGIT - firstDigit, MIN_DIGIT);
  }
}

class Devide implements Operator {
  public toText() {
    return "/";
  }

  public calc(num1: NumberRepresentation, num2: NumberRepresentation) {
    return num1.value() / num2.value();
  }

  public firstOperandDigitGenerator(): () => number {
    const MIN_DIGIT = 6;
    return () => nextRand(MAX_DIGIT - MIN_DIGIT, MIN_DIGIT);
  }

  public secondOperandDigitGenerator(firstDigit: number): () => number {
    const MIN_DIGIT = Math.min(MAX_DIGIT - firstDigit, 4);
    if (firstDigit < MIN_DIGIT) {
      return () => nextRand(firstDigit);
    }
    return () => nextRand(firstDigit - MIN_DIGIT, MIN_DIGIT);
  }
}

export const operators = {
  multiply: new Multiply(),
  devide: new Devide(),
};
