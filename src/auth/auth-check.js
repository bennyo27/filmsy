import React, { Component } from "react";
import { connect } from "react-redux";
import history from "./history";
import axios from "axios";

class AuthCheck extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.history.push("/");
  }

  render() {
    return <div />;
  }
}

export default AuthCheck;
