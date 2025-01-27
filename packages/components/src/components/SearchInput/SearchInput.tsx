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
  items?: SearchItem[];

  /** The item currently selected (controlled) */
  selectedItem?: SearchItem;
  /** Called when the user selects an item */
  onSelect?: (item: SearchItem) => void;

  /** Placeholder text in the input */
  placeholder?: string;
}

const SearchInput: FC<SearchInputProps> = ({
  query,
  onQueryChange,
  items,
  selectedItem,
  onSelect,
  placeholder = "Search...",
}) => {
  const filtered = items?.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="cc-searchinput-wrapper">
      <Combobox value={selectedItem} onChange={onSelect}>
        <ComboboxInput
          aria-label="Search"
          displayValue={(item: SearchItem | null) => item?.name || query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="cc-searchinput"
        />

        {!!filtered?.length && (
          <ComboboxOptions
            static
            anchor="bottom"
            className="cc-searchinput-options"
          >
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
