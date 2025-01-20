import { renderHook } from "@testing-library/react";
import { getAverageMood, getRandomInteger, getTotalMood } from "../../helpers";
import { useMood } from "../useMood/useMood";
import { useDailyInsight } from "./useDailyInsight";

jest.mock("../useMood/useMood");
jest.mock("../../helpers");

describe("useDailyInsight", () => {
  const mockMoodData = [
    { date: "2025-01-01", mood: 3 },
    { date: "2025-01-02", mood: 2 },
    { date: "2025-01-03", mood: 4 },
  ];

  const mockGetRandomInteger = getRandomInteger as jest.Mock;
  const mockGetTotalMood = getTotalMood as jest.Mock;
  const mockGetAverageMood = getAverageMood as jest.Mock;

  beforeEach(() => {
    (useMood as jest.Mock).mockReturnValue({ moodData: mockMoodData });
    mockGetRandomInteger.mockReturnValue(5);
    mockGetTotalMood.mockReturnValue(9);
    mockGetAverageMood.mockReturnValue(3);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize tasksCompleted with a random value", () => {
    const { result } = renderHook(() => useDailyInsight());

    expect(result.current.metrics[0].value).toBe(5);
    expect(mockGetRandomInteger).toHaveBeenCalledTimes(1);
  });

  it("should calculate moodScore based on moodData", () => {
    const { result } = renderHook(() => useDailyInsight());

    expect(mockGetTotalMood).toHaveBeenCalledWith(mockMoodData);
    expect(mockGetAverageMood).toHaveBeenCalledWith(9, mockMoodData);
    expect(result.current.metrics[1].value).toBe("3.0");
  });

  it("should return correct emojis for metrics", () => {
    const { result } = renderHook(() => useDailyInsight());

    expect(result.current.metrics[0].emoji).toBe("✅");
    expect(result.current.metrics[1].emoji).toBe("😊");
  });

  it("should update moodScore when moodData changes", () => {
    const { result, rerender } = renderHook(() => useDailyInsight());

    (useMood as jest.Mock).mockReturnValue({
      moodData: [
        { date: "2025-01-04", mood: 1 },
        { date: "2025-01-05", mood: 2 },
      ],
    });
    mockGetTotalMood.mockReturnValue(3);
    mockGetAverageMood.mockReturnValue(1.5);

    rerender();

    expect(mockGetTotalMood).toHaveBeenCalledWith([
      { date: "2025-01-04", mood: 1 },
      { date: "2025-01-05", mood: 2 },
    ]);
    expect(result.current.metrics[1].value).toBe("1.5");
    expect(result.current.metrics[1].emoji).toBe("😐");
  });
});
