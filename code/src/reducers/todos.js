import { createSlice, createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import uniqid from "uniqid";

export const MAX_PAGES = 3;
const DEFAULT_TODO_TEXT = "Drag to change priorites in the list";

const createDefaultTodo = () => ({
  id: uniqid(),
  text: DEFAULT_TODO_TEXT,
  isComplete: false,
  creationDate: Date.now()
});

const todos = createSlice({
  name: "todos",
  initialState: {
    itemsByPage: [[], null, null],
    filterByPage: ["all", "all", "all"],
    activePage: 0
  },
  reducers: {
    addTodo: (store, action) => {
      const newTodo = {
        id: uniqid(),
        text: action.payload,
        isComplete: false,
        creationDate: Date.now()
      };
      const items = store.itemsByPage[store.activePage] || [];

      store.itemsByPage[store.activePage] = [...items, newTodo];
    },
    toggleTodo: (store, action) => {
      const items = store.itemsByPage[store.activePage] || [];

      store.itemsByPage[store.activePage] = items.map((item) => (
        item.id === action.payload ? { ...item, isComplete: !item.isComplete } : item
      ));
    },
    deleteTodo: (store, action) => {
      const items = store.itemsByPage[store.activePage] || [];

      store.itemsByPage[store.activePage] = items.filter((item) => item.id !== action.payload);
    },
    deleteCompletedTasks: (store) => {
      const items = store.itemsByPage[store.activePage] || [];

      store.itemsByPage[store.activePage] = items.filter((item) => !item.isComplete);
    },
    changeFilter: (store, action) => {
      store.filterByPage[store.activePage] = action.payload;
    },
    setDueDate: (store, action) => {
      const dueDate = action.payload.date;
      const { item } = action.payload;
      const items = store.itemsByPage[store.activePage] || [];
      const itemInStore = items.find((el) => el.id === item.id);

      itemInStore.dueDate = dueDate;
    },
    editTodoText: (store, action) => {
      const { id, text } = action.payload;
      const items = store.itemsByPage[store.activePage] || [];
      const itemInStore = items.find((el) => el.id === id);

      itemInStore.text = text;
    },
    reorderTodos: (store, action) => {
      const newVisibleOrder = action.payload;
      const visibleIds = new Set(newVisibleOrder);
      const original = store.itemsByPage[store.activePage] || [];
      let cursor = 0;

      store.itemsByPage[store.activePage] = original.map((item) => {
        if (!visibleIds.has(item.id)) return item;
        const nextId = newVisibleOrder[cursor];
        cursor += 1;
        return original.find((el) => el.id === nextId);
      });
    },
    activatePage: (store, action) => {
      const pageIndex = action.payload;

      store.activePage = pageIndex;
      if (store.itemsByPage[pageIndex] === null) {
        store.itemsByPage[pageIndex] = [createDefaultTodo()];
      }
    }
  }
});

export default todos;

const selectActivePage = (store) => store.todos.activePage;
const selectItemsByPage = (store) => store.todos.itemsByPage;
const selectFilterByPage = (store) => store.todos.filterByPage;

export const selectActiveItems = createSelector(
  [selectItemsByPage, selectActivePage],
  (itemsByPage, activePage) => itemsByPage[activePage] || []
);

export const selectActiveFilter = createSelector(
  [selectFilterByPage, selectActivePage],
  (filterByPage, activePage) => filterByPage[activePage] || "all"
);

export const selectPageCount = createSelector(
  [selectItemsByPage],
  (itemsByPage) => itemsByPage.filter((items) => items !== null).length
);

export const selectFilteredTodos = createSelector(
  [selectActiveItems, selectActiveFilter],
  (items, filter) => {
    if (filter === "active") {
      return items.filter((todo) => !todo.isComplete);
    }
    if (filter === "completed") {
      return items.filter((todo) => todo.isComplete);
    }
    if (filter === "outdated") {
      return items.filter((todo) => todo.dueDate && dayjs(todo.dueDate).isBefore(dayjs()));
    }
    return items;
  }
);
