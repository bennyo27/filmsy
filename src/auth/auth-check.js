import React, { Component } from "react";
import { connect } from "react-redux";
import history from "./history";
import axios from "axios";

class AuthCheck extends Component {
  constructor() {
    super();
    this.send_profile_to_db = this.send_profile_to_db.bind(this);
  }

  send_profile_to_db(username, email, email_verified) {
    const data = { username, email, email_verified };
    axios.post("http://localhost:3300/users", data).then(() => {
      axios
        .get(`http://localhost:3300/users/${email}`)
        .then(res => {
          console.log(res.data);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("email_verified", res.data.email_verified);
        })
        .catch(err => console.log(err.response));
    });
    this.props.history.push("/");
  }

  componentDidMount() {
    this.send_profile_to_db(
      localStorage.getItem("username"),
      localStorage.getItem("email"),
      localStorage.getItem("email_verified")
    );
  }

  render() {
    return <div />;
  }
}

export default AuthCheck;
