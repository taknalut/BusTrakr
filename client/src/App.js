import React from "react";
import Home from "./pages";
import Nav from "./components/Nav";
import Login from "./components/Login";
import FavNav from "./components/FavNav"
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./App.css";

const options = {
  timeout: 5000,
  position: "bottom center"
};

const App = () => (
  <Provider template={AlertTemplate} {...options}>
      <Nav>
      <Login />
      </Nav>
      <Home />
  </Provider>
);

export default App;
