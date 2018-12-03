import { Auth0Lock } from "auth0-lock";
import auth0 from "auth0-js";

export var lock = new Auth0Lock(
  process.env.REACT_APP_CLIENT_ID,
  process.env.REACT_APP_DOMAIN_URL
);

export var webAuth = new auth0.WebAuth({
  domain: process.env.REACT_APP_CLIENT_ID,
  clientID: process.env.REACT_APP_DOMAIN_URL,
  scope: "openid profile",
  redirectUri: window.location.href
});

webAuth.parseHash((err, authResult) => {
  if (authResult) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_Token", authResult.accessToken);
    localStorage.setItem("expires_at", expiresAt);
  } else if (err) {
    console.log(err);
  }
});

export const isAuthenticated = () => {
  // Check whether the current time is past the
  // Access Token's expiry time
  let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
  return new Date().getTime() < expiresAt;
};

export const logout = () => {
  // Clear Access Token and ID Token from local storage
  localStorage.removeItem("access_Token");
  localStorage.removeItem("expires_at");
  window.location.reload();
};

export const getProfile = () => {
  let accessToken = getAccessToken();
  console.log(accessToken);
  if (accessToken) {
    webAuth.client.userInfo(accessToken, (err, profile) => {
      console.log(profile, err);
    });
  }
};

export const getAccessToken = () => {
  if (localStorage.getItem("access_Token")) {
    const accessToken = localStorage.getItem("access_Token");
    return accessToken;
  } else {
    console.log("No accessToken");
    return null;
  }
};
