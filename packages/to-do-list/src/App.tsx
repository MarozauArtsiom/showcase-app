import "./App.css";
import { Layout, Button } from "@showcase-lab/components";
import { useState } from "react";
import { ToDoList, ToDoItemType } from "./components";

const initialToDoItems: ToDoItemType[] = [
  {
    id: 1,
    text: "Make components",
    completed: true,
  },
  {
    id: 2,
    text: "Make To Do list",
    completed: true,
  },
  {
    id: 3,
    text: "Publish the article",
    completed: true,
  },
  {
    id: 4,
    text: "Conquer the universe",
    completed: false,
  },
  {
    id: 5,
    text: "Have a rest",
    completed: false,
  },
];

function App() {
  const [toDoItems, setToDoItems] = useState<ToDoItemType[]>(initialToDoItems);
  const [theme, setTheme] = useState<"white" | "dark">("white");

  const toggleItem = (id: number) => {
    setToDoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const containerStyle: object = {
    "--background-color":
      theme === "white" ? "var(--color-white)" : "var(--color-grey-999)",
  };

  return (
    <section style={containerStyle} className="app-body">
      <Layout padding="large" border={true}>
        <h1>My ToDo List</h1>
        <Button
          label={theme}
          onClick={() =>
            setTheme((theme) => (theme === "white" ? "dark" : "white"))
          }
        />
        <ToDoList items={toDoItems} onToggle={toggleItem} />
      </Layout>
    </section>
  );
}

export default App;
