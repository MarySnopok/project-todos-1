import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectionBtn } from "./styled/SelectionBtn";

import todos, { selectActiveFilter } from "../reducers/todos";

export const NavBoard = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectActiveFilter);

  return (
    <div className="nav-board-wrapper">
      <SelectionBtn onClick={() => dispatch(todos.actions.changeFilter("all"))} aria-current={filter === "all" ? "true" : undefined}>
        all
      </SelectionBtn>
      <SelectionBtn onClick={() => dispatch(todos.actions.changeFilter("active"))} aria-current={filter === "active" ? "true" : undefined}>
        active
      </SelectionBtn>
      <SelectionBtn onClick={() => dispatch(todos.actions.changeFilter("outdated"))} aria-current={filter === "outdated" ? "true" : undefined}>
        outdated
      </SelectionBtn>
      <SelectionBtn onClick={() => dispatch(todos.actions.changeFilter("completed"))} aria-current={filter === "completed" ? "true" : undefined}>
        done
      </SelectionBtn>
    </div>
  );
};
