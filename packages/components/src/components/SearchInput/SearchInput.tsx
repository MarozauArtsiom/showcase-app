import { FC, useMemo } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import "./SearchInput.scss";

export interface SearchItem {
  id: string | number;
  name: string;
}

export interface SearchInputProps {
  /** Current search query (controlled) */
  query: string;
  /** Called whenever the user types in the search input */
  onQueryChange: (val: string) => void;

  /** Full list of items */
  items: SearchItem[];

  /** The item currently selected (controlled) */
  selectedItem: SearchItem | null;
  /** Called when the user selects an item */
  onSelect: (item: SearchItem) => void;

  /** Placeholder text in the input */
  placeholder?: string;
}

/**
 * A stateless combo box for searching/filtering items.
 * Parent manages the "query" + "selectedItem" state, so this
 * component doesn't store anything internally.
 */
const SearchInput: FC<SearchInputProps> = ({
  query,
  onQueryChange,
  items,
  selectedItem,
  onSelect,
  placeholder = "Search...",
}) => {
  // Filter items based on the current query
  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(lower));
  }, [query, items]);

  return (
    <div className="cc-searchinput-wrapper">
      <Combobox
        value={selectedItem}
        onChange={onSelect}
        onClose={() => {
          // Optionally clear the query if needed, or do nothing
        }}
      >
        {/* The text input portion */}
        <ComboboxInput
          aria-label="Search"
          displayValue={(item: SearchItem | null) => item?.name || query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="cc-searchinput"
        />

        {/* The dropdown with filtered items */}
        {filtered.length > 0 && (
          <ComboboxOptions anchor="bottom" className="cc-searchinput-options">
            {filtered.map((item) => (
              <ComboboxOption
                key={item.id}
                value={item}
                className="cc-searchinput-option"
              >
                {item.name}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </Combobox>
    </div>
  );
};

export default SearchInput;
