import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSwatches } from "colorthief";

import { AddTodo } from "./components/AddTodo";
import { Header } from "./components/styled/Header";
import { Signature } from "./components/Signature";
import { InfoBoard } from "./components/InfoBoard";
import { NavBoard } from "./components/NavBoard";
import { AllTodoList } from "./components/AllTodoList";
import { CustomizeBtn } from "./components/styled/CustomizeBtn";
import { BackgroundContainer } from "./components/BackgroundsContainer";
import { ReactComponent as BrushIcon } from "./assets/brush.svg";
import custom from "./reducers/custom";

const MAX_LIST_NAME_LENGTH = 50;

const pickSwatchColor = (swatches, names, fallback) => {
  const match = names.map((name) => swatches[name]).find((swatch) => swatch);
  return match ? match.color.hex() : fallback;
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
  const selectedBackground = useSelector((store) => store.custom.selectedBackground);
  const listName = useSelector((store) => store.custom.listName);
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
    dispatch(custom.actions.setListName(e.currentTarget.textContent));
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
      try {
        swatches = await getSwatches(image);
      } catch (error) {
        return;
      }
      if (cancelled || !h1Ref.current) return;

      const startColor = pickSwatchColor(swatches, ["Vibrant", "LightVibrant", "Muted"], "#b8305c");
      const endColor = pickSwatchColor(swatches, ["DarkVibrant", "DarkMuted", "Muted"], "#4a4747");
      h1Ref.current.style.setProperty("--h1-gradient-start", startColor);
      h1Ref.current.style.setProperty("--h1-gradient-end", endColor);
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
              onInput={onListNameInput}
              onBlur={onListNameBlur}
              onKeyDown={onListNameKeyDown}>
              {listName}
            </h1>
            {!isEditingTitle ? (
              <button type="button" className="list-name-edit-btn" onClick={startEditingTitle} aria-label="Edit list name">
                <BrushIcon aria-hidden="true" />
              </button>
            ) : null}
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
