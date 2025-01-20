import { render } from "@testing-library/react";
import LoaderSpinner from "./LoaderSpinner";

describe("LoaderSpinner", () => {
  it("should render the spinner container", () => {
    const { getByTestId } = render(<LoaderSpinner />);

    const spinnerContainer = getByTestId("spinner-container");
    const spinner = getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
    expect(spinnerContainer).toBeInTheDocument();
  });
});
