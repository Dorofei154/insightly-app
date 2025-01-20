import { Mood } from "../../../interfaces/Mood";

export const getAverageMood = (totalMood: number, moodData: Mood[]) => {
  return totalMood / moodData.length;
};
