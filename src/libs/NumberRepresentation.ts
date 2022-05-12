import { headAndDigit, toNumericText, toText } from "./NumberConverter";

export abstract class NumberRepresentation {
  constructor(private readonly head: number, private readonly digit: number) {}

  public value() {
    return this.head * 10 ** this.digit;
  }

  public toText() {
    return toText(this.digitMapping())(this.head, this.digit);
  }

  public toNumericText() {
    return toNumericText(this.value());
  }

  abstract digitMapping(): readonly [number, string][];
}

export class JapaneseNumberRepresentation extends NumberRepresentation {
  private static readonly mapping: [number, string][] = [
    [12, "兆"],
    [8, "億"],
    [4, "万"],
    [0, ""],
  ];

  public digitMapping() {
    return JapaneseNumberRepresentation.mapping;
  }

  public static toText(num: number) {
    const [head, digit] = headAndDigit(num);
    return toText(JapaneseNumberRepresentation.mapping)(head, digit);
  }
}

export class EnglishNumberRepresentation extends NumberRepresentation {
  private static readonly mapping: [number, string][] = [
    [12, "trillion"],
    [9, "billion"],
    [6, "million"],
    [3, "thousand"],
    [0, ""],
  ];
  public digitMapping() {
    return EnglishNumberRepresentation.mapping;
  }

  public static toText(num: number) {
    const [head, digit] = headAndDigit(num);
    return toText(EnglishNumberRepresentation.mapping)(head, digit);
  }
}
