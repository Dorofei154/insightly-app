import { renderHook } from "@testing-library/react-hooks";
import { ReactNode } from "react";
import { MoodContext } from "../../../contexts/MoodContext/MoodContext";
import { MoodContextState } from "../../../interfaces/MoodContextState";
import { useMood } from "./useMood";

describe("useMood", () => {
  const mockContextValue: MoodContextState = {
    moodData: [
      { date: "2025-01-01", mood: 3 },
      { date: "2025-01-02", mood: 4 },
    ],
    addMood: jest.fn(),
  };

  const wrapper = ({ children }: { children: ReactNode }) => (
    <MoodContext.Provider value={mockContextValue}>
      {children}
    </MoodContext.Provider>
  );

  it("should return context when used within a MoodProvider", () => {
    const { result } = renderHook(() => useMood(), { wrapper });

    expect(result.current).toEqual(mockContextValue);
    expect(result.current.moodData).toEqual(mockContextValue.moodData);
  });

  it("should throw an error when used outside of MoodProvider", () => {
    const { result } = renderHook(() => useMood());

    expect(result.error).toEqual(
      new Error("useMood must be used within a MoodProvider")
    );
  });
});
