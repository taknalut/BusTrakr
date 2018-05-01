import React from "react";
import Home from "./pages";
import Nav from "./components/Nav";
import NavButtons from "./components/NavButtons";
import FavNav from "./components/FavNav"
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: "bottom center"
};

const App = () => (
  <Provider template={AlertTemplate} {...options}>
    <div id="main">
      <Nav>
      <NavButtons />
      </Nav>
      <Home />
    </div>
  </Provider>
);

export default App;
