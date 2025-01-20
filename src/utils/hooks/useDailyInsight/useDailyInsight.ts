import { useEffect, useMemo, useState } from "react";
import { getAverageMood, getRandomInteger, getTotalMood } from "../../helpers";
import { useMood } from "../useMood/useMood";

export const useDailyInsight = () => {
  const [tasksCompleted, setTasksCompleted] = useState<number>(0);
  const [moodScore, setMoodScore] = useState<number>(0);
  const { moodData } = useMood();

  const getMoodEmoji = (score: number): string => {
    if (score >= 2.5) return "😊";
    if (score >= 1.5) return "😐";
    return "😢";
  };

  const metrics = useMemo(
    () => [
      {
        label: "Tasks Completed",
        value: tasksCompleted,
        emoji: "✅",
      },
      {
        label: "Average Mood Score",
        value: moodScore.toFixed(1),
        emoji: getMoodEmoji(moodScore),
      },
    ],
    [moodScore, tasksCompleted]
  );

  useEffect(() => {
    const randomTasks = getRandomInteger();
    setTasksCompleted(randomTasks);
  }, []);

  useEffect(() => {
    const totalMood = getTotalMood(moodData);
    const averageMood = getAverageMood(totalMood, moodData);
    setMoodScore(averageMood);
  }, [moodData]);

  return { metrics };
};
