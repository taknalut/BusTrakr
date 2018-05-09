import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const GeoLocation = props => (
  <MuiThemeProvider>
    <RaisedButton
      label="Show Current Location?"
      primary={true}
      style={style}
      backgroundColor="#a4c639"
      onClick={() => props.userLocation()}
     />
  </MuiThemeProvider>
);

export default GeoLocation;
