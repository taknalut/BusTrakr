import React from "react";
import "./FavNav.css";

const FavNav = props => (
  <div id="mySidenav" className="sidenav">
    <a href="javascript:void(0)" className="closebtn" onclick={props.closeNav}>&times;</a>
    <h1>Your saved lines</h1>
    <a href="#">Line 1</a>
    <a href="#">Line 2</a>
    <a href="#">Line 3</a>
    <a href="#">Line 4</a>
  </div>
);

export FavNav;
