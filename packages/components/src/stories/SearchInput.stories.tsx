import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { SearchInput, SearchInputProps, SearchItem } from "../components";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  argTypes: {
    query: {
      control: "text",
    },
    items: {
      control: "object",
    },
    selectedItem: {
      control: "object",
    },
    placeholder: {
      control: "text",
    },
    onQueryChange: {
      action: "query changed",
      table: {
        disable: true,
      },
    },
    onSelect: {
      action: "item selected",
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof SearchInput>;

// A template with local state to demonstrate controlled behavior.
// This way, changes to query and selectedItem can be seen live in the preview.
const Template: StoryFn<SearchInputProps> = (args) => {
  const [query, setQuery] = useState(args.query);
  const [selectedItem, setSelectedItem] = useState(args.selectedItem);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    args.onQueryChange(val);
  };

  const handleSelect = (item: SearchItem) => {
    setSelectedItem(item);
    args.onSelect && args.onSelect(item);
  };

  return (
    <SearchInput
      {...args}
      query={query}
      selectedItem={selectedItem}
      onQueryChange={handleQueryChange}
      onSelect={handleSelect}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  query: "",
  items: [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
  ],
  selectedItem: undefined,
  placeholder: "Search for fruits...",
};

export const WithPreselection = Template.bind({});
WithPreselection.args = {
  query: "",
  items: [
    { id: 1, name: "Harry" },
    { id: 2, name: "Hermione" },
    { id: 3, name: "Ron" },
  ],
  selectedItem: { id: 2, name: "Hermione" },
  placeholder: "Favorite wizard?",
};
