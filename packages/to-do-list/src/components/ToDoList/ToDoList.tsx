import { List, SearchInput, SearchItem } from "@showcase-lab/components";
import { ToDoItem, ToDoItemType } from "../ToDoItem/ToDoItem";
import "./ToDoList.scss";
import { useState } from "react";

export interface ToDoListProps {
  items: ToDoItemType[];
  onToggle: (id: number) => void;
}

export const ToDoList: React.FC<ToDoListProps> = ({ items, onToggle }) => {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<SearchItem | undefined>(
    undefined
  );

  const searchItems = items.map(({ id, text }) => ({ id, name: text }));

  const toDoItems = items.filter(({ id }) => {
    if (!selectedItem) {
      return true;
    }
    return selectedItem.id === id;
  });

  return (
    <div className="td-todo-list">
      <SearchInput
        query={query}
        onQueryChange={setQuery}
        items={searchItems}
        selectedItem={selectedItem}
        onSelect={setSelectedItem}
        placeholder="Search for to do item..."
      />
      <List
        items={toDoItems}
        renderItem={(item) => (
          <ToDoItem key={item.id} item={item} onToggle={onToggle} />
        )}
      />
    </div>
  );
};
