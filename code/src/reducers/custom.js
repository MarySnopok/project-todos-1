import { createSlice } from "@reduxjs/toolkit";

import notes from "../assets/notes.jpg";
import magnets from "../assets/magnets.jpg";
import pencil from "../assets/pencil.jpg";
import minimalistic from "../assets/minimalistic.jpg";
import tealClip from "../assets/tealClip.jpg";
import whiteCotton from "../assets/whiteCotton.jpg";

const allBackgrounds = [notes, magnets, pencil, minimalistic, tealClip, whiteCotton];

export const getInitialBackgrounds = () => {
  const shuffled = [...allBackgrounds];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 4);
};

const initialBgs = getInitialBackgrounds();

const DEFAULT_LIST_NAME = "tap to customise";
const MAX_LIST_NAME_LENGTH = 50;

const custom = createSlice({
  name: "custom",
  initialState: {
    bgs: initialBgs,
    selectedBackgroundByPage: [initialBgs[0], null, null],
    customBackgroundByPage: [null, null, null],
    listNames: [DEFAULT_LIST_NAME, null, null]
  },
  reducers: {
    selectBackground: (store, action) => {
      const { pageIndex, image } = action.payload;
      store.selectedBackgroundByPage[pageIndex] = image;
    },
    setCustomBackground: (store, action) => {
      const { pageIndex, image } = action.payload;
      store.customBackgroundByPage[pageIndex] = image;
    },
    removeCustomBackground: (store, action) => {
      const pageIndex = action.payload;
      const customBackground = store.customBackgroundByPage[pageIndex];

      if (store.selectedBackgroundByPage[pageIndex] === customBackground) {
        [store.selectedBackgroundByPage[pageIndex]] = store.bgs;
      }
      store.customBackgroundByPage[pageIndex] = null;
    },
    setListName: (store, action) => {
      const { pageIndex, name } = action.payload;
      const trimmed = name.trim().slice(0, MAX_LIST_NAME_LENGTH);
      store.listNames[pageIndex] = trimmed || DEFAULT_LIST_NAME;
    },
    activatePage: (store, action) => {
      const pageIndex = action.payload;

      if (store.listNames[pageIndex] === null) {
        store.listNames[pageIndex] = DEFAULT_LIST_NAME;
      }
      if (store.selectedBackgroundByPage[pageIndex] === null) {
        [store.selectedBackgroundByPage[pageIndex]] = store.bgs;
      }
    }
  }
});

export default custom;
