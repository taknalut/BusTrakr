import React from "react";
import "./List.css";

export const List = props => {
  return (
  <div id="mySideNavBus" className="sidenav">
    <a href="javascript:void(0)" className="closebtn" onClick={props.closeNav}>&times;</a>
    <div className="list-overflow-container">
      <ul className="list-group">
        {props.children}
      </ul>
    </div>
  </div>
  );
};
