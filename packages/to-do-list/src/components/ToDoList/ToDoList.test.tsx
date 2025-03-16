// ToDoList.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToDoList, ToDoListProps } from "./ToDoList";

describe("ToDoList", () => {
  const itemsMock = [
    { id: 1, text: "Buy groceries", completed: false },
    { id: 2, text: "Walk the dog", completed: false },
    { id: 3, text: "Read a book", completed: false },
  ];

  const renderToDoList = (props: Partial<ToDoListProps> = {}) => {
    const defaultProps: ToDoListProps = {
      items: itemsMock,
      onToggle: jest.fn(),
      ...props,
    };
    return render(<ToDoList {...defaultProps} />);
  };

  it("displays all todo items by default", () => {
    renderToDoList();

    expect(screen.getByText("Buy groceries")).toBeDefined();
    expect(screen.getByText("Walk the dog")).toBeDefined();
    expect(screen.getByText("Read a book")).toBeDefined();
  });

  it("filters items when selecting a search suggestion", async () => {
    renderToDoList();
    const user = userEvent.setup();

    // Type enough to show "Walk the dog" as a suggestion
    const searchInput = screen.getByPlaceholderText("Search for to do item...");
    await user.type(searchInput, "Walk");

    // Grab the combobox option by role and name
    const suggestion = await screen.findByRole("option", {
      name: /walk the dog/i,
    });
    await user.click(suggestion);

    // Now only that item is shown
    expect(screen.getByText("Walk the dog")).toBeDefined();
    expect(screen.queryByText("Buy groceries")).not.toBeDefined();
    expect(screen.queryByText("Read a book")).not.toBeDefined();
  });

  it("calls onToggle when an item is toggled", async () => {
    const onToggleMock = jest.fn();
    renderToDoList({ onToggle: onToggleMock });
    const user = userEvent.setup();

    const itemToToggle = screen.getByText("Buy groceries");
    await user.click(itemToToggle);

    expect(onToggleMock).toHaveBeenCalledTimes(1);
    expect(onToggleMock).toHaveBeenCalledWith(1);
  });
});
