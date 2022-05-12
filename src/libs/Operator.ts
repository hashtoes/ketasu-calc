import { NumberRepresentation } from "./NumberRepresentation";

export interface Operator {
  toText(): string;
  calc(num1: NumberRepresentation, num2: NumberRepresentation): number;
  requiresSort(): boolean;
  constrainSecondOperand(): boolean;
}

class Multiply implements Operator {
  public toText() {
    return "*";
  }

  public calc(num1: NumberRepresentation, num2: NumberRepresentation) {
    return num1.value() * num2.value();
  }

  public requiresSort(): boolean {
    return false;
  }

  public constrainSecondOperand(): boolean {
    return true;
  }
}

class Devide implements Operator {
  public toText() {
    return "/";
  }

  public calc(num1: NumberRepresentation, num2: NumberRepresentation) {
    return num1.value() / num2.value();
  }

  public requiresSort(): boolean {
    return true;
  }

  public constrainSecondOperand(): boolean {
    return true;
  }
}

export const operators = {
  multiply: new Multiply(),
  devide: new Devide(),
};
