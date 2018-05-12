import React from "react";
import "./Nav.css";

const Nav = props => (
  <nav className="navbar navbar-light bg-light">
  <div className="container mobile-view">
    <a className="navbar-brand" href="/">BusTrakr
    <img src="https://s3.us-east-2.amazonaws.com/bustrakr/bus.png" height="50" className="d-inline-block align-bottom" alt="" />
    </a>
    <div>{props.children}</div>
    </div>
  </nav>
);

export default Nav;
