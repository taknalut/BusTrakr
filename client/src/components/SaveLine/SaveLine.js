import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const styles = {
  block: {
    maxWidth: 80,
    float: "left",
  },
  checkbox: {
    marginBottom: 16,
    paddingTop: 0,
    marginLeft: 15
  },
};

const SaveLines = props => (
  <MuiThemeProvider>
  <div style={styles.block} onClick={props.onClick}>
  <Checkbox
  checkedIcon={props.status ? <ActionFavorite style={{fill: "#FF6D00"}} /> : <ActionFavoriteBorder />}
  uncheckedIcon={!props.status ? <ActionFavoriteBorder /> : <ActionFavorite style={{fill: "#FF6D00"}} />}
  onCheck={props.updateSaved}
  style={styles.checkbox}
  label={props.checked ? "Unsave" : "Save"}
  />
  </div>
  </MuiThemeProvider>
)

export default SaveLines;
