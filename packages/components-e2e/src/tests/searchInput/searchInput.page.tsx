import { SearchInput, SearchItem } from "@showcase-lab/components";
import { useState } from "react";

const placeholder = "start typing...";

function DefaultInput() {
  const [query, setQuery] = useState<string>("");
  return (
    <SearchInput
      placeholder={placeholder}
      items={[]}
      query={query}
      onQueryChange={setQuery}
    />
  );
}

function InputWithSearchParams() {
  const [query, setQuery] = useState<string>("");
  const [selectedItem, onSelect] = useState<SearchItem>();
  const items: SearchItem[] = [
    {
      id: 1,
      name: "first",
    },
    {
      id: 2,
      name: "two",
    },
    {
      id: 3,
      name: "three",
    },
  ];

  return (
    <SearchInput
      placeholder={placeholder}
      items={items}
      query={query}
      onQueryChange={setQuery}
      selectedItem={selectedItem}
      onSelect={onSelect}
    />
  );
}

export default [
  {
    Component: DefaultInput,
    path: "search-input/default",
  },
  {
    Component: InputWithSearchParams,
    path: "search-input/with-items",
  },
];
