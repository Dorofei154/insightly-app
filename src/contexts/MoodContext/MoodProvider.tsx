import React, { ReactNode, useState } from "react";
import { MOCK_MOOD_DATA } from "../../constants/mockedArray";
import { MoodContext } from "./MoodContext";
import { Mood } from "../../interfaces/Mood";

export const MoodProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [moodData, setMoodData] = useState<Mood[]>(MOCK_MOOD_DATA);

  const addMood = (mood: Mood) => {
    setMoodData((prev) => [...prev.slice(-6), mood]);
  };

  return (
    <MoodContext.Provider value={{ moodData, addMood }}>
      {children}
    </MoodContext.Provider>
  );
};
