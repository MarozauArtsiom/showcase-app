import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput, { SearchItem } from "./SearchInput";

describe("SearchInput Component", () => {
  const items: SearchItem[] = [
    { id: "1", name: "Apple" },
    { id: "2", name: "Banana" },
    { id: "3", name: "Grape" },
    { id: "4", name: "Orange" },
  ];

  test("renders with the default placeholder", () => {
    const handleQueryChange = jest.fn();
    const handleSelect = jest.fn();

    render(
      <SearchInput
        query=""
        onQueryChange={handleQueryChange}
        items={items}
        selectedItem={null}
        onSelect={handleSelect}
      />
    );

    const inputElement = screen.getByPlaceholderText("Search...");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
  });

  test("renders with a custom placeholder", () => {
    const handleQueryChange = jest.fn();
    const handleSelect = jest.fn();
    const placeholderText = "Type to search...";

    render(
      <SearchInput
        query=""
        onQueryChange={handleQueryChange}
        items={items}
        selectedItem={null}
        onSelect={handleSelect}
        placeholder={placeholderText}
      />
    );

    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });

  test("calls onQueryChange when user types", () => {
    const handleQueryChange = jest.fn();
    const handleSelect = jest.fn();

    render(
      <SearchInput
        query=""
        onQueryChange={handleQueryChange}
        items={items}
        selectedItem={null}
        onSelect={handleSelect}
      />
    );

    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.change(inputElement, { target: { value: "Ap" } });

    expect(handleQueryChange).toHaveBeenCalledTimes(1);
    expect(handleQueryChange).toHaveBeenCalledWith("Ap");
  });

  test("shows no options if no items match the query", () => {
    const handleQueryChange = jest.fn();
    const handleSelect = jest.fn();

    render(
      <SearchInput
        query="zzz"
        onQueryChange={handleQueryChange}
        items={items}
        selectedItem={null}
        onSelect={handleSelect}
      />
    );

    // If nothing matches "zzz", no options should appear
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });

  test("shows options if some items match the query", () => {
    const handleQueryChange = jest.fn();
    const handleSelect = jest.fn();

    render(
      <SearchInput
        query="ap"
        onQueryChange={handleQueryChange}
        items={items}
        selectedItem={null}
        onSelect={handleSelect}
      />
    );

    act(() => {
      screen.getByRole("combobox").focus();
    });

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Grape")).toBeInTheDocument();
  });
});
