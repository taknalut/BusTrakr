import React from "react";
import "./Nav.css";

const Nav = props => (
  <nav className="navbar navbar-light bg-light mb-3">
  <div className="container">
    <a className="navbar-brand">BusTrakr
    <img src="images/busloc.png" height="50" className="d-inline-block align-bottom" alt="" />
    </a>
    <div>{props.children}</div>
    </div>
  </nav>
);

export default Nav;
