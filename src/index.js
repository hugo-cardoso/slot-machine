import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from "./App.js";

import store from './store.js';

// const initialState = {
//   cash: 50,
//   level: 'medium',
//   numbers: ['?','?','?'],
//   message: 'GOOD LUCK!'
// };

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById("root"));