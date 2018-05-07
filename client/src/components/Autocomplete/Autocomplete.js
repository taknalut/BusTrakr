import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import {orangeA700} from 'material-ui/styles/colors';

const styles = {
  underlineStyle: {
    borderColor: orangeA700,
  },
  floatingLabelFocusStyle: {
    color: orangeA700,
  },
};

const AutoCompleteFilters = props => (
    <MuiThemeProvider>
    <div>
    <AutoComplete
      floatingLabelText="Start your search by typing a route"
      filter={AutoComplete.fuzzyFilter}
      dataSource={props.dataSource}
      maxSearchResults={8}
      onNewRequest={props.handleFormSubmit}
      onUpdateInput={props.handleInputChange}
      animated={true}
      underlineFocusStyle={styles.underlineStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
    />
    </div>
    </ MuiThemeProvider>
  );

export default AutoCompleteFilters;
