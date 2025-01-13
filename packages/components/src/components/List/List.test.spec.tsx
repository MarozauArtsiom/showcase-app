// src/components/common/List/List.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import List, { ListProps } from "./List";

describe("List Component", () => {
  interface TestItem {
    id: number;
    name: string;
  }

  const renderList = (props: Partial<ListProps<TestItem>> = {}) => {
    const defaultProps: ListProps<TestItem> = {
      items: [
        { id: 1, name: "Item One" },
        { id: 2, name: "Item Two" },
        { id: 3, name: "Item Three" },
      ],
      renderItem: (item) => <span>{item.name}</span>,
      className: "",
    };

    return render(<List {...defaultProps} {...props} />);
  };

  test("renders list items correctly", () => {
    renderList();
    expect(screen.getByText("Item One")).toBeInTheDocument();
    expect(screen.getByText("Item Two")).toBeInTheDocument();
    expect(screen.getByText("Item Three")).toBeInTheDocument();
  });

  test("applies the correct className prop", () => {
    renderList({ className: "custom-class" });
    const listElement = screen.getByRole("list");
    expect(listElement).toHaveClass("cc-list");
    expect(listElement).toHaveClass("custom-class");
  });

  test("applies default className when none is provided", () => {
    renderList();
    const listElement = screen.getByRole("list");
    expect(listElement).toHaveClass("cc-list");
    expect(listElement).not.toHaveClass("custom-class");
  });

  test("renders no items when the items array is empty", () => {
    renderList({ items: [] });
    const listElement = screen.getByRole("list");
    expect(listElement).toBeEmptyDOMElement();
  });

  test("renders additional classes on list items", () => {
    const customRenderItem = (item: TestItem) => (
      <div className="custom-item">{item.name}</div>
    );
    renderList({ renderItem: customRenderItem });
    const listItemElements = screen.getAllByRole("listitem");
    listItemElements.forEach((li) => {
      expect(li).toHaveClass("cc-list__item");
      expect(li.firstChild).toHaveClass("custom-item");
    });
  });
});
