import {
  getIsNMinuteWalk,
  getIsWalkCircularAndNMinute,
  isWalkCircular,
  Walk
} from "../ex2";

describe("getIsNMinuteWalk", () => {
  it.each([
    { walkDuration: 10, walkDirections: ["n", "s"], expected: false },
    {
      walkDuration: 10,
      walkDirections: ["n", "s", "e", "o", "n", "s", "e", "o", "n", "s"],
      expected: true
    },
    { walkDuration: 1, walkDirections: ["n", "s"], expected: false },
    { walkDuration: 1, walkDirections: ["n"], expected: true }
  ])(
    "GIVEN a walk duration of $walkDuration and $walkDirections as directions, WHEN check the walk length, THEN return $expected",
    ({ walkDuration, walkDirections, expected }) => {
      const walk = walkDirections as Walk;
      const result = getIsNMinuteWalk(walkDuration)(walk);
      expect(result).toEqual(expected);
    }
  );
});

describe("isWalkCircular", () => {
  it.each([
    { walkDirections: ["n", "s"], expected: true },
    { walkDirections: ["n", "e"], expected: false },
    { walkDirections: ["n", "s", "n", "e", "s", "o"], expected: true },
    { walkDirections: ["n", "n", "n", "n"], expected: false }
  ])(
    "GIVEN the walk $walkDirections, WHEN check if the walk is circular, THEN return $expected",
    ({ walkDirections, expected }) => {
      const walk = walkDirections as Walk;
      const result = isWalkCircular(walk);
      expect(result).toEqual(expected);
    }
  );
});

describe("getIsWalkCircularAndNMinute", () => {
  it.each([
    { walkDuration: 10, walkDirections: ["n", "s"], expected: false },
    {
      walkDuration: 10,
      walkDirections: ["n", "s", "e", "o", "n", "s", "e", "o", "n", "s"],
      expected: true
    },
    { walkDuration: 2, walkDirections: ["n", "n"], expected: false }
  ])(
    "GIVEN a walk duration of $walkDuration and $walkDirections as directions, WHEN check for a circular walk of the given length, THEN return $expected",
    ({ walkDuration, walkDirections, expected }) => {
      const walk = walkDirections as Walk;
      const result = getIsWalkCircularAndNMinute(walkDuration)(walk);
      expect(result).toEqual(expected);
    }
  );
});
