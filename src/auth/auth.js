import auth0 from "auth0-js";
import history from "./history";
import Auth0Lock from "auth0-lock";

export class Auth {
  // Universal Login configuration
  lock = new Auth0Lock(
    process.env.REACT_APP_CLIENT_ID,
    process.env.REACT_APP_DOMAIN_URL
  );

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setSession = this.setSession.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    // authorize() connects to Auth0 and triggers Universal Login
    this.lock.show();
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("email_verified");
    // navigate to the home route
  }

  setSession() {
    this.lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      console.log(authResult);
      this.lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }

        localStorage.setItem("accessToken", authResult.accessToken);
        localStorage.setItem("username", profile.nickname);
        localStorage.setItem("email", profile.email);
      });
    });
  }

  isAuthenticated() {
    if (localStorage.getItem("accessToken")) {
      return true;
    } else {
      return false;
    }
  }
}

export default Auth;
