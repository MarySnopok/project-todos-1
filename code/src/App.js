import React from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import debounce from "debounce";
import { Structure } from "./Structure";
import { loadState, saveState } from "./localStorage";

import "react-datepicker/dist/react-datepicker.css";
import custom, { getInitialBackgrounds } from "./reducers/custom";
import todos from "./reducers/todos";

const reducer = combineReducers({
  todos: todos.reducer,
  custom: custom.reducer
});

const preloadedState = loadState();
if (preloadedState && preloadedState.custom) {
  // the swatch options should reshuffle every reload, not stay frozen at
  // whatever was picked on the very first visit and saved to localStorage
  preloadedState.custom.bgs = getInitialBackgrounds();

  // migrate state saved before multi-list support (single listName -> listNames per page)
  if (preloadedState.custom.listName !== undefined && !preloadedState.custom.listNames) {
    preloadedState.custom.listNames = [preloadedState.custom.listName, null, null];
    delete preloadedState.custom.listName;
  }

  // migrate state saved before per-page backgrounds (single background fields -> per-page arrays)
  const { selectedBackground, customBackground } = preloadedState.custom;
  if (selectedBackground !== undefined && !preloadedState.custom.selectedBackgroundByPage) {
    preloadedState.custom.selectedBackgroundByPage = [selectedBackground, null, null];
    preloadedState.custom.customBackgroundByPage = [customBackground || null, null, null];
    delete preloadedState.custom.selectedBackground;
    delete preloadedState.custom.customBackground;
  }
}
if (preloadedState && preloadedState.todos) {
  // migrate state saved before multi-list support (single items/filter -> per-page arrays)
  if (preloadedState.todos.items !== undefined && !preloadedState.todos.itemsByPage) {
    preloadedState.todos.itemsByPage = [preloadedState.todos.items, null, null];
    preloadedState.todos.filterByPage = [preloadedState.todos.filter || "all", "all", "all"];
    preloadedState.todos.activePage = 0;
    delete preloadedState.todos.items;
    delete preloadedState.todos.filter;
  }
}

const store = configureStore({ reducer, preloadedState });

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
