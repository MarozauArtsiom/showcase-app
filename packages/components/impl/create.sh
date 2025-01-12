#!/usr/bin/env bash

# -----------------------------------------------------------------------------
# This script creates a "SearchInput" component folder using the latest Headless
# UI Combobox, plus:
#   - A Sass (.scss) file for styling
#   - A Jest/RTL test
#   - An export line in index.ts (if present)
#
# Component API (stateless):
#   interface SearchItem {
#     id: string | number;
#     name: string;
#   }
#
#   interface SearchInputProps {
#     query: string;                  // The user's current search query (controlled)
#     onQueryChange: (val: string) => void; // Called whenever the user types
#     items: SearchItem[];           // Full list of items (client or server filtered)
#     selectedItem: SearchItem | null;  // Currently selected item (controlled)
#     onSelect: (item: SearchItem) => void; // Called when user chooses an item
#     placeholder?: string;          // Input placeholder text
#   }
#
# Behavior:
#   - The component displays a text input (ComboboxInput) for the search query.
#   - It filters the "items" based on "query" (case-insensitive).
#   - The parent controls "query" and "selectedItem," so no local state is stored.
#   - When the user chooses an item, "onSelect" is called.
#   - "onQueryChange" is called whenever the user types in the input.
#
# Usage:
#   1) Place this script in your components directory (where index.ts might exist).
#   2) Make it executable: chmod +x create-search-input.sh
#   3) Run: ./create-search-input.sh
#
# -----------------------------------------------------------------------------

COMPONENT_NAME="SearchInput"

# 1) Create the component folder
mkdir -p "$COMPONENT_NAME"

# 2) Create SearchInput.tsx
cat <<EOF > "${COMPONENT_NAME}/${COMPONENT_NAME}.tsx"
import React, { FC, useMemo } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';
import './${COMPONENT_NAME}.scss';

export interface SearchItem {
  id: string | number;
  name: string;
}

export interface ${COMPONENT_NAME}Props {
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
const ${COMPONENT_NAME}: FC<${COMPONENT_NAME}Props> = ({
  query,
  onQueryChange,
  items,
  selectedItem,
  onSelect,
  placeholder = 'Search...',
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

export default ${COMPONENT_NAME};
EOF

# 3) Create the Sass (SCSS) file
cat <<EOF > "${COMPONENT_NAME}/${COMPONENT_NAME}.scss"
/* Basic styling for a Headless UI Combobox-based search input. */

.cc-searchinput-wrapper {
  position: relative;
  display: inline-block;
  max-width: 300px;
  width: 100%;
}

.cc-searchinput {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db; /* Tailwind "gray-300" */
  border-radius: 0.25rem;
  outline: none;

  &[data-focus] {
    border-color: #3b82f6;      /* Tailwind "blue-500" */
    background-color: #eff6ff; /* Tailwind "blue-50" */
  }
}

.cc-searchinput-options {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  z-index: 10;
  width: 100%;
}

.cc-searchinput-option {
  padding: 0.5rem;
  cursor: pointer;

  &[data-focus] {
    background-color: #e0f2fe; /* Tailwind "sky-100" */
  }

  &[data-selected] {
    background-color: #bae6fd; /* Tailwind "sky-200" */
    font-weight: 600;
  }

  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
EOF

# 4) Create the Jest/RTL test file
cat <<EOF > "${COMPONENT_NAME}/${COMPONENT_NAME}.test.tsx"
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ${COMPONENT_NAME}, { SearchItem } from './${COMPONENT_NAME}';

describe('${COMPONENT_NAME} component', () => {
  const items: SearchItem[] = [
    { id: '1', name: 'Alpha' },
    { id: '2', name: 'Beta' },
    { id: '3', name: 'Gamma' },
    { id: '4', name: 'Delta' },
  ];

  test('shows placeholder if query and selectedItem are empty', () => {
    render(
      <${COMPONENT_NAME}
        query=""
        onQueryChange={() => {}}
        items={items}
        selectedItem={null}
        onSelect={() => {}}
        placeholder="Type to search..."
      />
    );
    expect(screen.getByPlaceholderText(/type to search/i)).toBeInTheDocument();
  });

  test('filters items by query', () => {
    const { rerender } = render(
      <${COMPONENT_NAME}
        query="a"
        onQueryChange={() => {}}
        items={items}
        selectedItem={null}
        onSelect={() => {}}
      />
    );
    // Open the combobox
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();
    expect(screen.queryByText('Delta')).not.toBeInTheDocument();

    // rerender with query="et"
    rerender(
      <${COMPONENT_NAME}
        query="et"
        onQueryChange={() => {}}
        items={items}
        selectedItem={null}
        onSelect={() => {}}
      />
    );
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
    expect(screen.queryByText('Delta')).toBeInTheDocument();
  });

  test('calls onQueryChange when user types', () => {
    const handleChange = jest.fn();
    render(
      <${COMPONENT_NAME}
        query=""
        onQueryChange={handleChange}
        items={items}
        selectedItem={null}
        onSelect={() => {}}
      />
    );
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Be' } });
    expect(handleChange).toHaveBeenCalledWith('Be');
  });

  test('calls onSelect when an item is chosen', () => {
    const handleSelect = jest.fn();
    render(
      <${COMPONENT_NAME}
        query="a"
        onQueryChange={() => {}}
        items={items}
        selectedItem={null}
        onSelect={handleSelect}
      />
    );
    // open
    fireEvent.click(screen.getByRole('combobox'));
    // pick 'Gamma'
    fireEvent.click(screen.getByText('Gamma'));
    expect(handleSelect).toHaveBeenCalledWith({ id: '3', name: 'Gamma' });
  });

  test('displays the selectedItem name', () => {
    render(
      <${COMPONENT_NAME}
        query=""
        onQueryChange={() => {}}
        items={items}
        selectedItem={{ id: '2', name: 'Beta' }}
        onSelect={() => {}}
      />
    );
    // The displayed input value should show "Beta"
    expect(screen.getByRole('combobox')).toHaveValue('Beta');
  });
});
EOF

# 5) Update index.ts to export the new component (if index.ts exists)
if [ -f "index.ts" ]; then
  # Remove any existing line for this component to avoid duplicates
  sed -i.bak "/export { default as ${COMPONENT_NAME} }/d" index.ts 2>/dev/null
  rm -f index.ts.bak 2>/dev/null

  # Append the new export line
  echo "export { default as ${COMPONENT_NAME} } from './${COMPONENT_NAME}/${COMPONENT_NAME}';" >> index.ts

  echo "Added export line to index.ts for ${COMPONENT_NAME}."
else
  echo "No index.ts found. Skipping export update."
fi

echo "Created stateless ${COMPONENT_NAME} component using the latest Headless UI Combobox, Sass, and test files."
