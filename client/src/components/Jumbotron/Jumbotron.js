import React from "react";

const Jumbotron = ({ children }) => (
  <div
    style={{ height: 250, clear: "both", padding: 0, }}
    className="jumbotron bg-light"
  >
    {children}
  </div>
);

export default Jumbotron;
