import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectionBtn } from "./styled/SelectionBtn";

import todos from "../reducers/todos";

export const NavBoard = () => {
  const dispatch = useDispatch();
  const filter = useSelector((store) => store.todos.filter);

  return (
    <div className="nav-board-wrapper">
      <SelectionBtn onClick={() => dispatch(todos.actions.changeFilter("all"))} aria-current={filter === "all" ? "true" : undefined}>
        all
      </SelectionBtn>
      <SelectionBtn onClick={() => dispatch(todos.actions.changeFilter("active"))} aria-current={filter === "active" ? "true" : undefined}>
        active
      </SelectionBtn>
      <SelectionBtn onClick={() => dispatch(todos.actions.changeFilter("completed"))} aria-current={filter === "completed" ? "true" : undefined}>
        done
      </SelectionBtn>
      <SelectionBtn onClick={() => dispatch(todos.actions.changeFilter("outdated"))} aria-current={filter === "outdated" ? "true" : undefined}>
        outdated
      </SelectionBtn>
    </div>
  );
};
