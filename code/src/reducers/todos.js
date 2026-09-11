import { createSlice } from "@reduxjs/toolkit";

import uniqid from "uniqid";

const todos = createSlice({
  name: "todos",
  initialState: {
    items: [],
    filter: "all"
  },
  reducers: {
    addTodo: (store, action) => {
      const newTodo = {
        id: uniqid(),
        text: action.payload,
        isComplete: false,
        creationDate: Date.now()
      };

      store.items = [...store.items, newTodo];
    },
    toggleTodo: (store, action) => {
      const updatedItems = store.items.map((item) => {
        if (item.id === action.payload) {
          const updatedTodo = {
            ...item,
            isComplete: !item.isComplete
          };
          return updatedTodo;
        } else {
          return item;
        }
      });

      store.items = updatedItems;
    },
    deleteTodo: (store, action) => {
      const decreasedItems = store.items.filter((item) => item.id !== action.payload);

      store.items = decreasedItems;
    },
    deleteCompletedTasks: (store) => {
      const decreasedCompletedItems = store.items.filter((item) => !item.isComplete);

      store.items = decreasedCompletedItems;
    },
    changeFilter: (store, action) => {
      store.filter = action.payload;
    },
    setDueDate: (store, action) => {
      const dueDate = action.payload.date;
      const { item } = action.payload;
      const itemInStore = store.items.find((el) => el.id === item.id);
      itemInStore.dueDate = dueDate;
    }
  }
});

export default todos;

export const selectFilteredTodos = (store) => {
  const { filter, items } = store.todos;
  if (filter === "all") {
    return items;
  }
  if (filter === "active") {
    return items.filter((todo) => {
      return !todo.isComplete;
    });
  }
  if (filter === "completed") {
    return items.filter((todo) => {
      return todo.isComplete;
    });
  }
};
