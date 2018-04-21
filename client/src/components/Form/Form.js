import React, { Component } from "react";
import "./Form.css";
import API from "../../utils/API";

class Form extends Component {
  // Setting the component's initial state
  state = {
    username: "",
    uuid: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // if (name === "password") {
    //   value = value.substring(0, 15);
    // }
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    API.saveUser({
      username: this.state.username,
      uuid: this.state.uuid,
      routes: []
    })
  };

  render() {
    return (
      <div>
        <form className="form">
          <input
            value={this.state.username}
            name="username"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Enter your new username"
          />
          <input
            value={this.state.uuid}
            name="uuid"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Enter a password"
          />
          <input type="submit" value="Submit" onClick={this.handleFormSubmit}></input>
        </form>
        {this.state.username}, {this.state.uuid}
      </div>
    );
  }
}

export default Form;
