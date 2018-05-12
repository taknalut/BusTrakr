import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import "./DropdownActive.css";

const DropdownActive = props => (
  <MuiThemeProvider>
  <IconMenu
    iconButtonElement={<p className="display-text">| View active buses <i className="material-icons align-middle">directions_bus</i></p>}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
    maxHeight={272}
  >
    {props.children}
  </IconMenu>
  </ MuiThemeProvider>
);

export default DropdownActive;
