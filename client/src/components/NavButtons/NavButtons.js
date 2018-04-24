import React from "react";
import ReactDOM from 'react-dom'
import Modal from 'react-responsive-modal';
import "./NavButtons.css";
import Firebase from "../Firebase";

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
      <div className="cl-effect-7">
        <a className="mobile-view" onClick={this.onOpenModal}>Login/Register</a>
        <Modal open={open} onClose={this.onCloseModal} little>
        <Firebase />
        </Modal>
    </div>
    );
  }
}
