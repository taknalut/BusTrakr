import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';

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
    />
    </div>
    </ MuiThemeProvider>
  );

export default AutoCompleteFilters;
