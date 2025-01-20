import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

jest.mock("../../utils/hooks", () => ({
  useTheme: jest.fn(() => ({
    theme: "dark",
  })),
}));

describe("Button Component", () => {
  it("handles onClick event when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
  });

  it("applies the correct type attribute", () => {
    render(<Button type="submit">Submit Button</Button>);

    const button = screen.getByRole("button", { name: /submit button/i });
    expect(button).toHaveAttribute("type", "submit");
  });
});
