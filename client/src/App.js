import React from "react";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Login from "./components/Login";
// import FavNav from "./components/FavNav"
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { BrowserRouter as Router, Route } from "react-router-dom";

import About from "./pages/About";
import "./App.css";

const options = {
  timeout: 5000,
  position: "bottom center"
};

const App = () => (
  <Router>
    <Provider template={AlertTemplate} {...options}>
        <Nav>
        <Login />
        </Nav>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
    </Provider>
  </Router>
);

export default App;
