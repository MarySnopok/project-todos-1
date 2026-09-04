import { createSlice } from "@reduxjs/toolkit";

import watch from "../assets/watch.jpg";
import notes from "../assets/notes.jpg";
import magnets from "../assets/magnets.jpg";
import pencil from "../assets/pencil.jpg";

const custom = createSlice({
  name: "custom",
  initialState: {
    bgs: [watch, notes, magnets, pencil],
    selectedBackground: watch,
    customBackground: null
  },
  reducers: {
    selectBackground: (store, action) => {
      const image = action.payload;
      store.selectedBackground = image;
    },
    setCustomBackground: (store, action) => {
      store.customBackground = action.payload;
    },
    removeCustomBackground: (store) => {
      if (store.selectedBackground === store.customBackground) {
        [store.selectedBackground] = store.bgs;
      }
      store.customBackground = null;
    }
  }
});

export default custom;
