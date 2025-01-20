import { fireEvent, render, screen } from "@testing-library/react";
import { MOODS } from "../../constants/mood";
import { useMoodForm } from "../../utils/hooks";
import MoodForm from "./MoodForm";

const mockHandleChange = jest.fn();
const mockHandleSubmit = jest.fn();

jest.mock("../../utils/hooks", () => ({
  useMoodForm: jest.fn(() => ({
    currentMood: 0,
    handleChange: mockHandleChange,
    handleSubmit: mockHandleSubmit,
  })),
  useTheme: jest.fn(() => ({
    theme: "dark",
  })),
}));

describe("MoodForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form title and all mood options", () => {
    render(<MoodForm />);

    expect(screen.getByText("Log Your Mood")).toBeInTheDocument();
    MOODS.forEach((mood) => {
      expect(screen.getByLabelText(mood.label)).toBeInTheDocument();
    });
  });

  it("should disable the submit button if no mood is selected", () => {
    render(<MoodForm />);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    expect(submitButton).toBeDisabled();
  });

  it("should enable the submit button when a mood is selected", () => {
    (useMoodForm as jest.Mock).mockReturnValue({
      currentMood: MOODS[0].value,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });

    render(<MoodForm />);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    expect(submitButton).not.toBeDisabled();
  });

  it("should call handleSubmit when the form is submitted", () => {
    (useMoodForm as jest.Mock).mockReturnValue({
      currentMood: MOODS[0].value,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });

    render(<MoodForm />);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
