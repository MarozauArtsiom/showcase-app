import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button component", () => {
  test("renders correctly", () => {
    render(<Button>Hello Button</Button>);
    expect(screen.getByText(/Hello Button/)).toBeInTheDocument();
  });
});
