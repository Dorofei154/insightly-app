import React from "react";
import { render, screen } from "@testing-library/react";
import MoodAnalysis from "./MoodAnalysis";
import { useMoodAnalysis } from "../../utils/hooks";

jest.mock("../../utils/hooks", () => ({
  useMoodAnalysis: jest.fn(() => ({
    insightMessage: "You are feeling great today!",
  })),
  useTheme: jest.fn(() => ({
    theme: "dark",
  })),
}));

describe("MoodAnalysis", () => {
  beforeEach(() => {
    (useMoodAnalysis as jest.Mock).mockReturnValue({
      insightMessage: "Your mood has been improving over the past few days!",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the mood analysis header and correct insight message", () => {
    render(<MoodAnalysis />);

    expect(screen.getByText("Mood Analysis")).toBeInTheDocument();
    expect(
      screen.getByText("Your mood has been improving over the past few days!")
    ).toBeInTheDocument();
  });

  it("should update the insight message when hook returns new data", () => {
    (useMoodAnalysis as jest.Mock).mockReturnValue({
      insightMessage:
        "It seems like you’ve been feeling a bit down. Hang in there!",
    });

    render(<MoodAnalysis />);

    expect(
      screen.getByText(
        "It seems like you’ve been feeling a bit down. Hang in there!"
      )
    ).toBeInTheDocument();
  });
});
