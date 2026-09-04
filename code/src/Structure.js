import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { AddTodo } from "./components/AddTodo";
import { Header } from "./components/styled/Header";
import { Signature } from "./components/Signature";
import { InfoBoard } from "./components/InfoBoard";
import { NavBoard } from "./components/NavBoard";
import { AllTodoList } from "./components/AllTodoList";
import { CustomizeBtn } from "./components/styled/CustomizeBtn";
import { BackgroundContainer } from "./components/BackgroundsContainer";

export const Structure = () => {
  const [value, setValue] = useState("closed");
  const selectedBackground = useSelector((store) => store.custom.selectedBackground);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${selectedBackground})`;
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
        <CustomizeBtn onClick={toggleDiv} />
        {value === "open" ? <BackgroundContainer /> : null}
      </Header>
      <div className="main-grid">
        <div className="grid">
          <h1>todos</h1>
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
