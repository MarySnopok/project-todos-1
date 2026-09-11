import React from "react";
import { useDispatch } from "react-redux";
import { SelectionBtn } from "./styled/SelectionBtn";

import todos from "../reducers/todos";

export const NavBoard = () => {
  const dispatch = useDispatch();

  return (
    <div className="nav-board-wrapper">
      <SelectionBtn onClick={() => dispatch(todos.actions.changeFilter("all"))}>all</SelectionBtn>
      <SelectionBtn onClick={() => dispatch(todos.actions.changeFilter("active"))}>active</SelectionBtn>
      <SelectionBtn onClick={() => dispatch(todos.actions.changeFilter("completed"))}>done</SelectionBtn>
      <SelectionBtn onClick={() => dispatch(todos.actions.changeFilter("outdated"))}>outdated</SelectionBtn>
    </div>
  );
};
