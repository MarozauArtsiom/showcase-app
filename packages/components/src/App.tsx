import React, { useState } from "react";
import { Checkbox } from "./components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Checkbox checked={true}></Checkbox>
    </>
  );
}

export default App;
