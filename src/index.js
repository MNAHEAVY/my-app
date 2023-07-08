import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store";
//import { router} from "./router";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-6yvop9dj.us.auth0.com"
      clientId="zCXmpX2b7wcmjf9kvHDsFKJp5YYjqykV"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
