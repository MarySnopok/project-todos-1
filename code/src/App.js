import React from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import debounce from "debounce";
import { Structure } from "./Structure";
import { loadState, saveState } from "./localStorage";

import "react-datepicker/dist/react-datepicker.css";
import custom from "./reducers/custom";
import todos from "./reducers/todos";

const reducer = combineReducers({
  todos: todos.reducer,
  custom: custom.reducer
});

const store = configureStore({ reducer, preloadedState: loadState() });

store.subscribe(
  // debouce npm package for better performances in case multiple changes occur in a short time
  debounce(() => {
    saveState(store.getState());
  })
);

export const App = () => {
  return (
    <Provider store={store}>
      <Structure />
    </Provider>
  );
};
