import { getAverageMood } from "./getAverageMood";

describe("getAverageMood", () => {
  describe("getAverageMood", () => {
    it.each([
      {
        description:
          "should return the correct average mood for multiple entries",
        moodData: [
          { date: "2025-01-01", mood: 3 },
          { date: "2025-01-02", mood: 2 },
          { date: "2025-01-03", mood: 4 },
        ],
        expected: 3,
      },
      {
        description: "should return NaN if moodData is empty",
        moodData: [],
        expected: NaN,
      },
      {
        description: "should handle a single mood entry",
        moodData: [{ date: "2025-01-01", mood: 5 }],
        expected: 5,
      },
    ])("$description", ({ moodData, expected }) => {
      const totalMood = moodData.reduce((sum, item) => sum + item.mood, 0);
      const averageMood = getAverageMood(totalMood, moodData);

      if (Number.isNaN(expected)) {
        expect(averageMood).toBeNaN();
      } else {
        expect(averageMood).toBe(expected);
      }
    });
  });
});
