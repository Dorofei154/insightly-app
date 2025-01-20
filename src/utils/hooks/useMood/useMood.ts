import { useContext } from "react";
import { MoodContext } from "../../../contexts/MoodContext/MoodContext";
import { MoodContextState } from "../../../interfaces/MoodContextState";

export const useMood = () => {
  const context = useContext<MoodContextState | undefined>(MoodContext);
  if (!context) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
};
