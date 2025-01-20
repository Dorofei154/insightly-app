import { Mood } from "../../../interfaces/Mood";

export const getTotalMood = (moodData: Mood[]): number => {
  return moodData.reduce((total, entry) => total + entry.mood, 0);
};
