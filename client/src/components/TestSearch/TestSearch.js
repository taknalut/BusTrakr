import React from "react";
import ReactDOM from 'react-dom'
import Autosuggest from 'react-autosuggest';
import axios from "axios";
import "./TestSearch.css";

const busRoutesArr = [];
const config = {
  headers: {'api_key': 'a2a6cab6a2104b0a95bef74fa2c62b52'}
};

axios.get("https://api.wmata.com/Bus.svc/json/jRoutes", config)
.then(res => {
res.data.Routes.forEach(item =>
  busRoutesArr.push({
    "routeID": item.RouteID,
    "name": item.Name
  })
)
})

console.log("bus routes Array")
console.log(busRoutesArr)


function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return busRoutesArr.filter(busRoutesArr => regex.test(busRoutesArr.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

export default class TestSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Start typing your bus line",
      value,
      onChange: this.onChange
    };

    return (
      <div className="container">
      <div>Search: </div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
        </div>
    );
  }
}
