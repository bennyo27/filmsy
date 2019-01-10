import Auth0Lock from "auth0-lock";
import axios from "axios";

export const USER_LOGIN_START = "USER_LOGIN_START";
export const USER_LOGIN_COMPLETE = "USER_LOGIN_COMPLETE";

export const USER_LOGOUT_START = "USER_LOGIN_START";
export const USER_LOGOUT_COMPLETE = "USER_LOGIN_COMPLETE";

var lock = new Auth0Lock(
  "lElY8YB0H8bbaVlBUExJteiEmVxweAha",
  "dashboard-app.auth0.com"
);

export const getProfile = () => {
  var userData = {};
  return dispatch => {
    dispatch({ type: USER_LOGIN_START });
    lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getUserInfo() and save it to store
      lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }
        let lockUsername = profile.nickname;
        let lockEmail = profile.email;
        let lockEmail_verified = profile.email_verified;
        userData = { lockUsername, lockEmail, lockEmail_verified };

        axios
          .get(`http://localhost:3300/users/${userData.lockEmail}`)
          .then(res => {
            console.log(res);
            let username = res.data.username;
            let email = res.data.email;
            let email_verified = res.data.email_verified;
            let data = { username, email, email_verified };
            console.log("worked1", data);
            dispatch({ type: USER_LOGIN_COMPLETE, payload: data });
          })
          .catch(err => {
            //posts user if user does not exist
            if (err.response.status == 404) {
              axios.post("http://localhost:3300/users", userData).then(() => {
                axios
                  .get(`http://localhost:3300/users/${userData.lockEmail}`)
                  .then(res => {
                    let username = res.data.username;
                    let email = res.data.email;
                    let email_verified = res.data.email_verified;
                    let data = { username, email, email_verified };
                    console.log("worked2", data);
                    dispatch({ type: USER_LOGIN_COMPLETE, payload: data });
                  });
              });
            }
          });
      });
    });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({ type: USER_LOGOUT_START });
    const logout = {};
    dispatch({ type: USER_LOGOUT_COMPLETE, payload: logout });
  };
};

export default lock;
