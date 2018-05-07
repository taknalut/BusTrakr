import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  button: {
    margin: 12,
    fontSize: "10px",
    position: "relative",
    top: -465,
    left: -228,
    zIndex: 2,
  },
  labelStyle: {
	  fontSize: '10px',
    paddingRight: 1,
    paddingLeft: 1,
    paddingTop: 1,
    paddingBottom: 1,
  }
};

const TrafficButton = (props) => (
    <MuiThemeProvider>
    <RaisedButton
      label={props.showTraffic ? "Hide traffic" : "Show traffic" }
      labelPosition="before"
      style={styles.button}
      labelStyle={styles.labelStyle}
      containerElement="label"
      onClick={props.changeState}
    >
    </RaisedButton>
    </ MuiThemeProvider>
   );

export default TrafficButton;
