import React from "react";
import ReactDOM from 'react-dom'
import Autosuggest from 'react-autosuggest';
import axios from "axios";
import API from "../../utils/API";
import "./TestSearch.css";

const busRoutesArr = [];

API.searchAll()
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

  return busRoutesArr.filter(busRoutesArr => regex.test(busRoutesArr.routeID));
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
  constructor(props) {
    super(props);

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
      placeholder: "Start search by typing your bus line",
      value,
      onChange: this.onChange
    };

    return (
      <div>
      <form className="form-inline mb-3">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        />
        <button onClick={ (value) => this.props.handleFormSubmitTest(value) }
        className="btn btn-primary ml-1">
          Search
        </button>
        </form>
        </div>
    );
  }
}
