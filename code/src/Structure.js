import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSwatches, getPalette } from "colorthief";

import { AddTodo } from "./components/AddTodo";
import { Header } from "./components/styled/Header";
import { Signature } from "./components/Signature";
import { InfoBoard } from "./components/InfoBoard";
import { NavBoard } from "./components/NavBoard";
import { AllTodoList } from "./components/AllTodoList";
import { CustomizeBtn } from "./components/styled/CustomizeBtn";
import { BackgroundContainer } from "./components/BackgroundsContainer";
import custom from "./reducers/custom";

const MAX_LIST_NAME_LENGTH = 50;

const pickSwatchColor = (swatches, names, fallback) => {
  const match = names.map((name) => swatches[name]).find((swatch) => swatch);
  return match ? match.color.hex() : fallback;
};

const hslToHex = (h, s, l) => {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;
  let rgb = [0, 0, 0];
  if (h < 60) rgb = [c, x, 0];
  else if (h < 120) rgb = [x, c, 0];
  else if (h < 180) rgb = [0, c, x];
  else if (h < 240) rgb = [0, x, c];
  else if (h < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];

  const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(rgb[0])}${toHex(rgb[1])}${toHex(rgb[2])}`;
};

const MIN_VISIBLE_LIGHTNESS = 15;
const MAX_VISIBLE_LIGHTNESS = 85;
const SATURATION_BOOST = 10;
const MIN_USABLE_SATURATION = 15;
const MIN_USABLE_LIGHTNESS = 20;
const FALLBACK_THEME_COLOR = "var(--fallback-color)";

const pickThemeColor = (palette) => {
  if (!palette || palette.length === 0) return FALLBACK_THEME_COLOR;

  const visibleColors = palette.filter((color) => {
    const { l } = color.hsl();
    return l > MIN_VISIBLE_LIGHTNESS && l < MAX_VISIBLE_LIGHTNESS;
  });
  const candidates = visibleColors.length > 0 ? visibleColors : palette;

  const mostSaturated = candidates.reduce((best, color) => (
    color.hsl().s > best.hsl().s ? color : best
  ));

  const { h, s, l } = mostSaturated.hsl();
  if (s < MIN_USABLE_SATURATION || l < MIN_USABLE_LIGHTNESS) {
    return FALLBACK_THEME_COLOR;
  }

  const boostedSaturation = Math.min(s + SATURATION_BOOST, 100);
  return hslToHex(h, boostedSaturation, l);
};

const moveCursorToEnd = (element) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
};

export const Structure = () => {
  const [value, setValue] = useState("closed");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const activePage = useSelector((store) => store.todos.activePage);
  const selectedBackgroundByPage = useSelector((store) => store.custom.selectedBackgroundByPage);
  const selectedBackground = selectedBackgroundByPage[activePage];
  const listNames = useSelector((store) => store.custom.listNames);
  const listName = listNames[activePage];
  const dispatch = useDispatch();
  const h1Ref = useRef(null);

  const startEditingTitle = () => {
    setIsEditingTitle(true);
  };

  const onListNameInput = (e) => {
    if (e.currentTarget.textContent.length > MAX_LIST_NAME_LENGTH) {
      e.currentTarget.textContent = e.currentTarget.textContent.slice(0, MAX_LIST_NAME_LENGTH);
      moveCursorToEnd(e.currentTarget);
    }
  };

  const onListNameBlur = (e) => {
    const name = e.currentTarget.textContent;
    dispatch(custom.actions.setListName({ pageIndex: activePage, name }));
    setIsEditingTitle(false);
  };

  const onListNameKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  useEffect(() => {
    if (isEditingTitle && h1Ref.current) {
      h1Ref.current.focus();
      moveCursorToEnd(h1Ref.current);
    }
  }, [isEditingTitle]);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${selectedBackground})`;
  }, [selectedBackground]);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();

    image.onload = async () => {
      let swatches;
      let palette;
      try {
        [swatches, palette] = await Promise.all([
          getSwatches(image),
          getPalette(image, { colorCount: 20 })
        ]);
      } catch (error) {
        if (!cancelled) {
          document.body.style.setProperty("--theme-color", "var(--fallback-color)");
        }
        return;
      }
      if (cancelled) return;

      if (h1Ref.current) {
        const startColor = pickSwatchColor(swatches, ["Vibrant", "LightVibrant", "Muted"], "#b8305c");
        const endColor = pickSwatchColor(swatches, ["DarkVibrant", "DarkMuted", "Muted"], "#4a4747");
        h1Ref.current.style.setProperty("--h1-gradient-start", startColor);
        h1Ref.current.style.setProperty("--h1-gradient-end", endColor);
      }

      const themeColor = pickThemeColor(palette);
      document.body.style.setProperty("--theme-color", themeColor);
    };
    image.src = selectedBackground;

    return () => {
      cancelled = true;
    };
  }, [selectedBackground]);

  const toggleDiv = () => {
    if (value === "open") {
      setValue("closed");
    }
    if (value === "closed") {
      setValue("open");
    }
  };

  return (
    <main>
      <Header height={100} width={100}>
        <CustomizeBtn onClick={toggleDiv} aria-label="Customize background" aria-expanded={value === "open"} />
        {value === "open" ? <BackgroundContainer /> : null}
      </Header>
      <div className="main-grid">
        <div className="grid">
          <div className="list-name-wrapper">
            {/* contentEditable genuinely makes this interactive; jsx-a11y doesn't know that yet */}
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <h1
              ref={h1Ref}
              contentEditable={isEditingTitle}
              suppressContentEditableWarning
              aria-label="List name"
              onClick={startEditingTitle}
              onInput={onListNameInput}
              onBlur={onListNameBlur}
              onKeyDown={onListNameKeyDown}>
              {listName}
            </h1>
          </div>
          <AddTodo />
          <NavBoard />
          <AllTodoList />
          <InfoBoard />
        </div>
        <Signature />
      </div>
    </main>
  );
};
