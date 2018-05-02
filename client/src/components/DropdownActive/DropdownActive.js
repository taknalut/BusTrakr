import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import "./DropdownActive.css";

const DropdownActive = props => (
  <MuiThemeProvider>
  <IconMenu
    iconButtonElement={<p className="display-text">View active buses on the road <i className="material-icons align-middle">directions_bus</i></p>}
    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
    maxHeight={272}
  >
    <MenuItem value="10A" primaryText="10A Static Example" />
    <MenuItem value="10B" primaryText="10B Static Example" />
    {props.children}
  </IconMenu>
  </ MuiThemeProvider>
);

export default DropdownActive;
