import { createContext } from "react";
import { MoodContextState } from "../../interfaces/MoodContextState";

export const MoodContext = createContext<MoodContextState | undefined>(
  undefined
);
