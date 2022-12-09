import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import "./exercise";
import reportWebVitals from "./reportWebVitals";

import rootReducer from "./modules";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(rootReducer);
//console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider stroe={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
