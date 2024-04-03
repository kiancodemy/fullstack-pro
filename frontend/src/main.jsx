import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./Store";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <BrowserRouter>
          <App></App>
        </BrowserRouter>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
