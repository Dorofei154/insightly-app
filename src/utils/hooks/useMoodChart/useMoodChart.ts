import { ChartData, ChartOptions } from "chart.js"; // Типы из Chart.js
import { useCallback, useMemo, useState } from "react";
import { chartViews } from "../../../constants/chartViews";
import { MOCK_MONTHLY_DATA } from "../../../constants/mockMonthlyData";
import { MOCK_WEEKLY_DATA } from "../../../constants/mockWeeklyData";
import { ChartView } from "../../../enum/chartView";
import { useMood } from "../useMood/useMood";
import { ChartDataMap } from "./chartDataMap.type";

export const useMoodChart = () => {
  const [currentChartView, setCurrentChartView] = useState<ChartView>(
    ChartView.DAILY
  );
  const { moodData } = useMood();

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Mood Trends (${
          currentChartView.charAt(0).toUpperCase() + currentChartView.slice(1)
        })`,
      },
    },
  };

  const chartDataMap: ChartDataMap = {
    [ChartView.DAILY]: {
      labels: moodData.map((entry) => entry.date),
      data: moodData.map((entry) => entry.mood),
    },
    [ChartView.WEEKLY]: {
      labels: MOCK_WEEKLY_DATA.map((entry) => entry.week),
      data: MOCK_WEEKLY_DATA.map((entry) => entry.mood),
    },
    [ChartView.MONTHLY]: {
      labels: MOCK_MONTHLY_DATA.map((entry) => entry.month),
      data: MOCK_MONTHLY_DATA.map((entry) => entry.mood),
    },
  };

  const getChartData = (): ChartData<"line"> => {
    const { labels, data } = chartDataMap[currentChartView];

    return {
      labels,
      datasets: [
        {
          label: "Mood Score",
          data,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    };
  };

  const onClick = useCallback(
    (value: ChartView) => () => setCurrentChartView(value),
    [setCurrentChartView]
  );

  const buttons = useMemo(
    () =>
      chartViews.map(({ value, label }) => ({
        key: value,
        onClick: onClick(value),
        disabled: currentChartView === value,
        children: label,
      })),
    [onClick, currentChartView]
  );

  return {
    buttons,
    chartOptions,
    getChartData,
  };
};
