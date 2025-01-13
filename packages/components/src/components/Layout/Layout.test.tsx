import { render } from "@testing-library/react";
import Layout, { LayoutProps } from "./Layout";

describe("Layout Component", () => {
  const renderLayout = (props: Partial<LayoutProps> = {}) => {
    const defaultProps: LayoutProps = {
      children: <div data-testid="child">Test Child</div>,
      padding: "medium",
      border: true,
      className: "",
    };

    return render(<Layout {...defaultProps} {...props} />);
  };

  test("renders children correctly", () => {
    const { getByTestId } = renderLayout();
    const child = getByTestId("child");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Test Child");
  });
});
