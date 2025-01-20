import { act, renderHook } from "@testing-library/react";
import { chartViews } from "../../../constants/chartViews";
import { useMood } from "../useMood/useMood";
import { useMoodChart } from "./useMoodChart";

jest.mock("../useMood/useMood");

describe("useMoodChart", () => {
  const mockMoodData = [
    { date: "2025-01-01", mood: 3 },
    { date: "2025-01-02", mood: 4 },
    { date: "2025-01-03", mood: 5 },
  ];

  beforeEach(() => {
    (useMood as jest.Mock).mockReturnValue({
      moodData: mockMoodData,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return correct buttons with onClick handlers", () => {
    const { result } = renderHook(() => useMoodChart());
    const { buttons } = result.current;

    expect(buttons).toHaveLength(chartViews.length);

    chartViews.forEach(({ value, label }, index) => {
      expect(buttons[index].key).toBe(value);
      expect(buttons[index].children).toBe(label);
      expect(typeof buttons[index].onClick).toBe("function");
    });
  });

  it("should change currentChartView when onClick is triggered", () => {
    const { result } = renderHook(() => useMoodChart());
    const { buttons } = result.current;

    act(() => {
      buttons[0].onClick();
    });

    expect(result.current.buttons[0].disabled).toBe(true);
    expect(result.current.buttons[1].disabled).toBe(false);
  });

  it("should return correct chart options", () => {
    const { result } = renderHook(() => useMoodChart());
    const { chartOptions } = result.current;

    expect(chartOptions.plugins?.title?.text).toContain("Mood Trends (Daily)");
    expect(chartOptions.responsive).toBe(true);
  });

  it("should return correct data for the chart", () => {
    const { result } = renderHook(() => useMoodChart());
    const { getChartData } = result.current;

    const chartData = getChartData();

    expect(chartData.labels).toEqual(mockMoodData.map((entry) => entry.date));
    expect(chartData.datasets[0].data).toEqual(
      mockMoodData.map((entry) => entry.mood)
    );
    expect(chartData.datasets[0].label).toBe("Mood Score");
  });
});
