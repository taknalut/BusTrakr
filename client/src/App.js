import React from "react";
import Home from "./pages";
import Nav from "./components/Nav";
import NavButtons from "./components/NavButtons";
import TestSearch from "./components/TestSearch";

const App = () => (
  <div>
    <Nav>
    <NavButtons />
    </Nav>
    <TestSearch />
    <Home />
  </div>
);

export default App;
