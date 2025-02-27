import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders with correct label", () => {
    render(<Button label="Click Me" />);
    expect(screen.getByText("Click Me")).toBeDefined();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("is disabled when disabled prop is true", () => {
    render(<Button label="Click Me" disabled={true} />);
    expect(
      screen.getByText("Click Me").closest("button")?.getAttribute("disabled")
    ).toBe("");
  });

  test("applies correct variant class", () => {
    render(<Button label="Click Me" variant="danger" />);
    const button = screen.getByText("Click Me").closest("button");

    expect(button).not.toBeNull();
    expect(button!.getAttribute("class")).toContain("m-danger");
  });
});
