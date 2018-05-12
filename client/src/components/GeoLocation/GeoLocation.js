import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import "./Geo.css";

const style = {
  margin: 12,
};

const GeoLocation = props => (
  <MuiThemeProvider>
    <RaisedButton
      label="Show me where I am"
      primary={true}
      style={style}
      backgroundColor="#a4c639"
      onClick={() => props.userLocation()}
     />
  </MuiThemeProvider>
);

// const GeoLocation = props => {
//   return (
//     <div>
//       <button  onClick={() => props.userLocation()}>Use Current Location?</button>
//     </div>
//   );
// };

export default GeoLocation;
