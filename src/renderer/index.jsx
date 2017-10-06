import React from "react";
import { render } from  "react-dom";
import App from "./app";
import devToolsEnhancer from 'remote-redux-devtools';

import { createStore, compose } from 'redux'
import reducers from './modules'
import { Provider } from 'react-redux'
const store = createStore(reducers, devToolsEnhancer())

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
)