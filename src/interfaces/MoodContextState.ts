import { Mood } from "./Mood";

export interface MoodContextState {
  moodData: Mood[];
  addMood: (mood: Mood) => void;
}
