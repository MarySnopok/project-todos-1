import { createSlice } from "@reduxjs/toolkit";

import watch from "../assets/watch.jpg";
import notes from "../assets/notes.jpg";
import magnets from "../assets/magnets.jpg";
import pencil from "../assets/pencil.jpg";
import minimalistic from "../assets/minimalistic.jpg";
import tealClip from "../assets/tealClip.jpg";
import whiteCotton from "../assets/whiteCotton.jpg";

const allBackgrounds = [watch, notes, magnets, pencil, minimalistic, tealClip, whiteCotton];

export const getInitialBackgrounds = () => {
  const shuffled = [...allBackgrounds];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 4);
};

const initialBgs = getInitialBackgrounds();

const DEFAULT_LIST_NAME = "todos";
const MAX_LIST_NAME_LENGTH = 50;

const custom = createSlice({
  name: "custom",
  initialState: {
    bgs: initialBgs,
    selectedBackground: initialBgs[0],
    customBackground: null,
    listName: DEFAULT_LIST_NAME
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
    },
    setListName: (store, action) => {
      const trimmed = action.payload.trim().slice(0, MAX_LIST_NAME_LENGTH);
      store.listName = trimmed || DEFAULT_LIST_NAME;
    }
  }
});

export default custom;
