import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders with correct label", () => {
    render(<Button label="Click Me" />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("is disabled when disabled prop is true", () => {
    render(<Button label="Click Me" disabled />);
    expect(screen.getByText("Click Me")).toBeDisabled();
  });

  test("applies correct variant class", () => {
    const { container } = render(<Button label="Click Me" variant="danger" />);
    expect(container.firstChild).toHaveClass("m-danger");
  });
});
