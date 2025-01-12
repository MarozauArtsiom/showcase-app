import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./Input";

describe("Input component", () => {
  test("renders an input with default props", () => {
    render(<Input />);
    const inputEl = screen.getByRole("textbox");
    expect(inputEl).toBeInTheDocument();
  });

  test("can accept a placeholder prop", () => {
    render(<Input placeholder="Type here..." />);
    expect(screen.getByPlaceholderText(/type here/i)).toBeInTheDocument();
  });

  test("calls onChange when user types", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Hello" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
