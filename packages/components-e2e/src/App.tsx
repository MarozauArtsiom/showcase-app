import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./tests/page";

const App = () => (
  <>
    <header>
      <h1>e2e tests</h1>
    </header>
    <main>
      <Router>
        <Routes>
          {Page.map(({ Component, path }) => (
            <Route path={path} element={<Component />} />
          ))}
        </Routes>
      </Router>
    </main>
  </>
);

export default App;
