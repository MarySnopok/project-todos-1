import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getSwatches } from "colorthief";

import { AddTodo } from "./components/AddTodo";
import { Header } from "./components/styled/Header";
import { Signature } from "./components/Signature";
import { InfoBoard } from "./components/InfoBoard";
import { NavBoard } from "./components/NavBoard";
import { AllTodoList } from "./components/AllTodoList";
import { CustomizeBtn } from "./components/styled/CustomizeBtn";
import { BackgroundContainer } from "./components/BackgroundsContainer";

const pickSwatchColor = (swatches, names, fallback) => {
  const match = names.map((name) => swatches[name]).find((swatch) => swatch);
  return match ? match.color.hex() : fallback;
};

export const Structure = () => {
  const [value, setValue] = useState("closed");
  const selectedBackground = useSelector((store) => store.custom.selectedBackground);
  const h1Ref = useRef(null);

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
          <h1 ref={h1Ref}>todos</h1>
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
