import { useEffect, useState } from "react";
import { useMood } from "../useMood/useMood";
import { InsightMessages } from "./insightMessages.enum";

export const useMoodAnalysis = () => {
  const [insightMessage, setInsightMessage] = useState<InsightMessages | null>(
    null
  );
  const { moodData } = useMood();
  useEffect(() => {
    const moodScores = moodData.map((entry) => entry.mood);
    const checkTrend = (comparisonFn: (a: number, b: number) => boolean) =>
      moodScores.every(
        (score, index, arr) =>
          index === 0 || comparisonFn(score, arr[index - 1])
      );

    const isIncreasing = moodScores.length && checkTrend((a, b) => a >= b);
    const isDecreasing = moodScores.length && checkTrend((a, b) => a <= b);

    if (isIncreasing) {
      setInsightMessage(InsightMessages.IMPROVING);
    } else if (isDecreasing) {
      setInsightMessage(InsightMessages.DECLINING);
    } else {
      setInsightMessage(InsightMessages.VARYING);
    }
  }, [moodData]);

  return { insightMessage };
};
