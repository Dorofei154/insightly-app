import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { memo } from "react";
import { Line } from "react-chartjs-2";
import { Button } from "../../shared";
import { useMoodChart } from "../../utils/hooks";
import styles from "./MoodTrends.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MoodTrends: React.FC = () => {
  const { getChartData, chartOptions, buttons } = useMoodChart();

  return (
    <div className={styles.chart__container}>
      <h2>Mood Trends Visualization</h2>
      <div className={styles.button__container}>
        {buttons.map(({ key, ...buttonProps }) => (
          <Button key={key} {...buttonProps} />
        ))}
      </div>
      <Line data={getChartData()} options={chartOptions} />
    </div>
  );
};

export default memo(MoodTrends);
