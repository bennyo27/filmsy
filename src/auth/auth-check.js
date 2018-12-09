import React, { Component } from "react";
import { connect } from "react-redux";
import history from "./history";
import axios from "axios";

class AuthCheck extends Component {
  constructor() {
    super();
    this.send_profile_to_db = this.send_profile_to_db.bind(this);
  }

  send_profile_to_db(profile) {
    const data = profile;
    console.log(data);
    axios.post("users", data).then(() =>
      axios
        .get("users", {
          params: { email: profile.profile.email }
        })
        .then(res => {
          console.log(res);
          this.props.db_profile_success(res.data);
        })
        .then(history.replace("/"))
    );
  }

  componentDidMount() {
    if (this.props.auth.userProfile) {
      console.log("hello", this.props.auth.userProfile);
    }
    this.send_profile_to_db(this.props.auth.userProfile);
  }

  render() {
    return <div />;
  }
}

function mapStateToProps(state) {
  return {
    db_profile: state.authReducer.DBUserProfile,
    auth: state.authReducer.auth
  };
}

export default connect(mapStateToProps)(AuthCheck);
