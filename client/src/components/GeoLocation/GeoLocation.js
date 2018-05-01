import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const GeoLocation = props => (
  <MuiThemeProvider>
    <RaisedButton
      label="Use Current Location?"
      primary={true}
      style={style}
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
