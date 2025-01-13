import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkbox from "./Checkbox";

describe("Checkbox component", () => {
  test("renders with default label", () => {
    render(<Checkbox />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  test("calls onChange when clicked", () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("shows checked styles when checked is true", () => {
    render(<Checkbox checked />);
    const checkboxElement = screen.getByRole("switch");
    expect(checkboxElement).toHaveClass("m-checked");
  });
});
