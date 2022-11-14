/**
 * exercise-2
 * You live in the city of Cartesia where all roads are laid out in a perfect grid.
 * You arrived ten minutes too early to an appointment, so you decided to take the opportunity to go for a short walk.
 * The city provides its citizens with a Walk Generating App on their phones -- every time you press the button it sends you an array of one-letter strings representing directions to walk (eg. ['n', 's', 'w', 'e']).
 * You always walk only a single block for each letter (direction) and you know it takes you one minute to traverse one city block, so create a function that will return true if the walk the app gives you will take you exactly ten minutes (you don't want to be early or late!) and will, of course, return you to your starting point. Return false otherwise. Note: you will always receive a valid array containing a random assortment of direction letters ('n', 's', 'e', or 'w' only). It will never give you an empty array (that's not a walk, that's standing still!).
 */

import { flow, pipe } from "fp-ts/lib/function";
import * as RA from "fp-ts/ReadonlyArray";
import * as R from "fp-ts/Record";
import * as O from "fp-ts/Option";

const DEFAULT_WALK_MINUTE = 10;

export type Direction = "n" | "s" | "o" | "e";
export type Walk = ReadonlyArray<Direction>;
export type CheckWalk = (walk: Walk) => boolean;

/**
 * Returns a CheckWalk that returns true if the input walk length is equal to the desired input duration.
 *
 * @param duration the desired walk duration
 * @returns true if input walk length is duration
 */
export const getIsNMinuteWalk = (duration: number): CheckWalk => (
  walk
): boolean => walk.length === duration;

type WalkByDirection = Record<Direction, number>;
const startingWalk: WalkByDirection = { e: 0, n: 0, o: 0, s: 0 };

/**
 * A CheckWalk thath returns true if the input walk will ends in the same point has started.
 * This functions will count if the walk moves toward nord are the same toward sud, and the same with east and ovest.
 *
 * @param walk the desired array of direction
 * @returns true if input walk ends where started
 */
export const isWalkCircular: CheckWalk = flow(
  RA.reduce(startingWalk, (acc, nextDirection) =>
    pipe(
      acc,
      R.lookup(nextDirection),
      O.getOrElse(() => 0),
      count => ({ ...acc, [nextDirection]: count + 1 })
    )
  ),
  gw => gw.n - gw.s === 0 && gw.o - gw.e === 0
);

/**
 * Returns a CheckWalk that returns true if the input walk duration is equal to desired one and if it will ends in the same point has started.
 *
 * @param duration the desired walk duration
 * @returns true if input walk respect both the contition
 */
export const getIsWalkCircularAndNMinute = (
  duration: number = DEFAULT_WALK_MINUTE
): CheckWalk => (walk: Walk): boolean =>
  pipe(
    [getIsNMinuteWalk(duration), isWalkCircular],
    RA.every(f => f(walk))
  );
