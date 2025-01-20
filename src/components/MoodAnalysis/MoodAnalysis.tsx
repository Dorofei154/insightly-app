import React, { memo } from "react";
import { useMoodAnalysis, useTheme } from "../../utils/hooks";
import styles from "./MoodAnalysis.module.css";

const MoodAnalysis: React.FC = () => {
  const { insightMessage } = useMoodAnalysis();
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
        Mood Analysis
      </h2>
      <p
        className={`${styles.message} ${
          theme === "dark" ? styles.message__dark : styles.message__light
        }`}
      >
        {insightMessage}
      </p>
    </div>
  );
};

export default memo(MoodAnalysis);
