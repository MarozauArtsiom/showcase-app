import { Checkbox } from "@showcase-lab/components";
import "./ToDoItem.scss";

export interface ToDoItemType {
  id: number;
  text: string;
  completed: boolean;
}

export interface ToDoItemProps {
  item: ToDoItemType;
  onToggle: (id: number) => void;
}

export const ToDoItem: React.FC<ToDoItemProps> = ({ item, onToggle }) => {
  return (
    <div className="td-todo-item">
      <Checkbox checked={item.completed} onChange={() => onToggle(item.id)} />
      <span
        className={`td-todo-item__text ${item.completed ? "m-completed" : ""}`}
      >
        {item.text}
      </span>
    </div>
  );
};
