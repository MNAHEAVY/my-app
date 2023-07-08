import auth0 from "auth0-js";
import axios from "axios";

const client = new auth0.WebAuth({
  domain: "YOUR_DOMAIN.auth0.com",
  clientID: "YOUR_CLIENT_ID",
  redirectUri: "http://localhost:3000/callback",
  responseType: "token id_token",
  scope: "openid",
});

function createUser() {
  client.checkSession({}, (err, authResult) => {
    if (err) {
      console.error(err);
    } else if (authResult && authResult.accessToken) {
      // Make a request to your Node.js server to create a new user
      const config = {
        headers: { Authorization: `Bearer ${authResult.accessToken}` },
      };
      axios
        .post("/api/users", {}, config)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
    }
  });
}
createUser();
