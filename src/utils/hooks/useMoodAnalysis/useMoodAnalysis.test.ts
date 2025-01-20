import { renderHook } from "@testing-library/react-hooks";
import { useMood } from "../useMood/useMood";
import { InsightMessages } from "./insightMessages.enum";
import { useMoodAnalysis } from "./useMoodAnalysis";

jest.mock("../useMood/useMood");

describe("useMoodAnalysis", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return IMPROVING when mood scores are increasing", () => {
    (useMood as jest.Mock).mockReturnValue({
      moodData: [
        { date: "2025-01-01", mood: 1 },
        { date: "2025-01-02", mood: 2 },
        { date: "2025-01-03", mood: 3 },
      ],
    });

    const { result } = renderHook(() => useMoodAnalysis());

    expect(result.current.insightMessage).toBe(InsightMessages.IMPROVING);
  });

  it("should return DECLINING when mood scores are decreasing", () => {
    (useMood as jest.Mock).mockReturnValue({
      moodData: [
        { date: "2025-01-01", mood: 3 },
        { date: "2025-01-02", mood: 2 },
        { date: "2025-01-03", mood: 1 },
      ],
    });

    const { result } = renderHook(() => useMoodAnalysis());

    expect(result.current.insightMessage).toBe(InsightMessages.DECLINING);
  });

  it("should return VARYING when mood scores are fluctuating", () => {
    (useMood as jest.Mock).mockReturnValue({
      moodData: [
        { date: "2025-01-01", mood: 1 },
        { date: "2025-01-02", mood: 3 },
        { date: "2025-01-03", mood: 2 },
      ],
    });

    const { result } = renderHook(() => useMoodAnalysis());

    expect(result.current.insightMessage).toBe(InsightMessages.VARYING);
  });

  it("should handle empty mood data gracefully", () => {
    (useMood as jest.Mock).mockReturnValue({
      moodData: [],
    });

    const { result } = renderHook(() => useMoodAnalysis());

    expect(result.current.insightMessage).toBe(InsightMessages.VARYING);
  });
});
