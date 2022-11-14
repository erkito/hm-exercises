/**
 * exercise-1
 * Write some code that, giving an array of strings, returns the counter of those items where at least a char is repeated
 */

import { pipe } from "fp-ts/lib/function";
import * as S from "fp-ts/string";
import * as RA from "fp-ts/ReadonlyArray";

/**
 * Returns true if the input string contains the same char at least 2 times.
 *
 * @param word the input string
 * @returns true for repeated char
 */
export const hasRepeatedChar = (word: string): boolean =>
  pipe(
    word,
    S.split(""),
    RA.some(currentChar =>
      pipe(word, S.split(currentChar), RA.size, x => x > 2)
    )
  );

/**
 * Count how many string in the input array has at least a repeated char.
 *
 * @param words the array containing the strings to check
 * @returns the number of repeated string
 */
export const countWordWithRepeatedChar = (
  words: ReadonlyArray<string>
): number =>
  pipe(
    words,
    RA.map(hasRepeatedChar),
    RA.reduce(0, (accumulator, value) =>
      value ? accumulator + 1 : accumulator
    )
  );
