import React from "react";
import Home from "./pages";
import Nav from "./components/Nav";
import NavButtons from "./components/NavButtons";
import TestSearch from "./components/TestSearch";
import Form from "./components/Form";
import FavNav from "./components/FavNav"


const App = () => (
  <div id="main">
    <Nav>
    <NavButtons />
    </Nav>
    <Home />
    <Form />
  </div>
);

export default App;
