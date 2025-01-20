import { getTotalMood } from "./getTotalMood";

describe("getTotalMood", () => {
  it.each([
    {
      description:
        "should return the correct total mood score for a non-empty array",
      moodData: [
        { date: "2025-01-01", mood: 3 },
        { date: "2025-01-02", mood: 2 },
        { date: "2025-01-03", mood: 4 },
      ],
      expected: 9,
    },
    {
      description: "should return 0 for an empty array",
      moodData: [],
      expected: 0,
    },
    {
      description: "should handle a single mood entry correctly",
      moodData: [{ date: "2025-01-01", mood: 5 }],
      expected: 5,
    },
    {
      description: "should correctly sum negative mood values",
      moodData: [
        { date: "2025-01-01", mood: -2 },
        { date: "2025-01-02", mood: 3 },
        { date: "2025-01-03", mood: -1 },
      ],
      expected: 0,
    },
  ])("$description", ({ moodData, expected }) => {
    const totalMood = getTotalMood(moodData);

    expect(totalMood).toBe(expected);
  });
});
