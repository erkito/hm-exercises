import { countWordWithRepeatedChar, hasRepeatedChar } from "../ex1";

describe("hasRepeatedChar", () => {
  it.each([
    { word: "querty", expected: false },
    { word: "qwertyq", expected: true },
    { word: "qqwerty", expected: true }
  ])(
    "GIVEN the word $word WHEN check for repeated char THEN return $expected",
    ({ word, expected }) => {
      const result = hasRepeatedChar(word);
      expect(result).toEqual(expected);
    }
  );
});

describe("countWordWithRepeatedChar", () => {
  it.each([
    { words: [], expected: 0 },
    { words: ["querty"], expected: 0 },
    { words: ["qwertyq"], expected: 1 },
    { words: ["querty", "qwertyq", "qqwerty"], expected: 2 },
    { words: ["a","b","c"], expected: 0 },
    { words: ["a","b","cc"], expected: 1 },
    { words: ["ABC","deef","hi", "mnmn"], expected: 2 },
    { words: ["AABBCCDDDDD","123","xyz", "qwertt"], expected: 2 },
    { words: ["123a","1233","11", "tttttxxxxxzzzzz"], expected: 3 },
  ])(
    "GIVEN the words $words WHEN count for words with repeated char THEN return $expected",
    ({ words, expected }) => {
      const result = countWordWithRepeatedChar(words);
      expect(result).toEqual(expected);
    }
  );
});
