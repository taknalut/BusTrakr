import React from "react";
import ReactDOM from 'react-dom'
import Modal from 'react-responsive-modal';
import "./NavButtons.css";

export default class NavButtons extends React.Component {
  state = {
    open: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <nav className="cl-effect-7">
        <a onClick={this.onOpenModal}>Login/Register</a>
        <Modal open={open} onClose={this.onCloseModal} little>
        <p></p>
        <p>Firebase Authentification goes here</p>
        </Modal>
    </nav>
    );
  }
}
