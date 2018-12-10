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
    console.log(data);
    axios.post("http://localhost:3300/users", data).then(() =>
      axios
        .get("http://localhost:3300/users", {
          params: { email: profile.profile.email }
        })
        .then(res => this.props.db_profile_success(res.data))
        .then(window.location.replace("/");)
    );
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
