import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer/";

export default createStore(
  reducer,
  {},
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
    // process.env.NODE_ENV === "development" && window.devToolsExtension
    //   ? window.devToolsExtension()
    //   : f => f
  )
);
