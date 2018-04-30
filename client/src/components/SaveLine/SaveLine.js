import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const SaveLines = props => (
  <MuiThemeProvider>
  <div style={styles.block}>
  <Checkbox
  checkedIcon={<ActionFavorite />}
  uncheckedIcon={<ActionFavoriteBorder />}
  onCheck={props.updateSaved}
  style={styles.checkbox}
  label={props.checked ? "Unsave" : "Save"}
  />
  </div>
  </MuiThemeProvider>
)

export default SaveLines;
