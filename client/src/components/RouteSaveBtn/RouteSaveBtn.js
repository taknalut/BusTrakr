import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const RouteSaveBtn = props => (
  <button {...props}>
    Save This Route
  </button>
);

export default RouteSaveBtn;
