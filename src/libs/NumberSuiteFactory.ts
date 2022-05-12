import {
  EnglishNumberRepresentation,
  JapaneseNumberRepresentation,
  NumberRepresentation,
} from "./NumberRepresentation";

export type SuiteType = "japanese" | "english";
interface Suite {
  repr: (head: number, digit: number) => NumberRepresentation;
  conv: (num: number) => string;
}

export const getNumberSuite = (type: SuiteType): Suite => {
  switch (type) {
    case "japanese":
      return {
        repr: (head: number, digit: number) =>
          new JapaneseNumberRepresentation(head, digit),
        conv: JapaneseNumberRepresentation.toText,
      };
    case "english":
      return {
        repr: (head: number, digit: number) =>
          new EnglishNumberRepresentation(head, digit),
        conv: EnglishNumberRepresentation.toText,
      };
  }
};
