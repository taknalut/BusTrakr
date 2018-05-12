import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import "./DropdownFav.css";

const DropdownFavs = props => (
  <MuiThemeProvider>
  <IconMenu
    iconButtonElement={<p className="display-text">View your saved lines<i className="material-icons align-middle">expand_more</i></p>}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
    maxHeight={272}
  >
    {props.children}
  </IconMenu>
  </ MuiThemeProvider>
);

export default DropdownFavs;
