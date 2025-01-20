import { memo } from "react";
import { useDailyInsight, useTheme } from "../../utils/hooks";
import styles from "./DailyInsights.module.css";

const DailyInsight: React.FC = () => {
  const { metrics } = useDailyInsight();
  const { theme } = useTheme();

  return (
    <div
      className={`${styles.container} ${
        theme === "dark" ? styles.container__dark : styles.container__light
      }`}
    >
      <h2
        className={`${styles.heading} ${
          theme === "dark" ? styles.heading__dark : styles.heading__light
        }`}
      >
        Daily Insights
      </h2>
      {metrics.map(({ label, value, emoji }) => (
        <div
          key={label}
          className={`${styles.emoji} ${
            theme === "dark" ? styles.emoji__dark : styles.emoji__light
          }`}
        >
          <span
            className={`${styles.emoji} ${
              theme === "dark" ? styles.emoji__dark : styles.emoji__light
            }`}
          >
            {emoji}
          </span>
          <div>
            <strong
              className={`${styles.metric__value} ${
                theme === "dark"
                  ? styles.metric__value__dark
                  : styles.metric__value__light
              }`}
            >
              {label} {value}
            </strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(DailyInsight);
