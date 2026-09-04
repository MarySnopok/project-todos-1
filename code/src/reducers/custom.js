import { createSlice } from "@reduxjs/toolkit";

import watch from "../assets/watch.jpg";
import notes from "../assets/notes.jpg";
import magnets from "../assets/magnets.jpg";
import pencil from "../assets/pencil.jpg";

const custom = createSlice({
  name: "custom",
  initialState: {
    bgs: [watch, notes, magnets, pencil],
    selectedBackground: watch
  },
  reducers: {
    selectBackground: (store, action) => {
      const image = action.payload;
      store.selectedBackground = image;
    }
  }
});

export default custom;
