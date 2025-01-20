import { fireEvent, render, screen } from "@testing-library/react";
import { useMoodChart } from "../../utils/hooks";
import MoodTrends from "./MoodTrends";

jest.mock("../../utils/hooks", () => ({
  useMoodChart: jest.fn(),
  useTheme: jest.fn(() => ({
    theme: "dark",
  })),
}));

describe("MoodTrends Component", () => {
  const mockButtons = [
    { key: "daily", onClick: jest.fn(), disabled: false, children: "Daily" },
    { key: "weekly", onClick: jest.fn(), disabled: true, children: "Weekly" },
    {
      key: "monthly",
      onClick: jest.fn(),
      disabled: false,
      children: "Monthly",
    },
  ];

  const mockChartData = {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Mood Score",
        data: [3, 4, 2],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const mockChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Mood Trends" },
    },
  };

  beforeEach(() => {
    (useMoodChart as jest.Mock).mockReturnValue({
      getChartData: jest.fn(() => mockChartData),
      chartOptions: mockChartOptions,
      buttons: mockButtons,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the title correctly", () => {
    render(<MoodTrends />);
    expect(screen.getByText("Mood Trends Visualization")).toBeInTheDocument();
  });

  it("should render buttons with correct properties", () => {
    render(<MoodTrends />);

    const buttonElements = screen.getAllByRole("button");
    expect(buttonElements).toHaveLength(mockButtons.length);

    mockButtons.forEach(({ children }, index) => {
      expect(buttonElements[index]).toHaveTextContent(children as string);
    });
  });

  it("should call the correct button's onClick when clicked", () => {
    render(<MoodTrends />);

    fireEvent.click(screen.getByText("Daily"));
    expect(mockButtons[0].onClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Monthly"));
    expect(mockButtons[2].onClick).toHaveBeenCalledTimes(1);
  });
});
