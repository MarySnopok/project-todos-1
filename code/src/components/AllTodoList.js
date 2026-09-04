import React from "react";
import { useSelector, useDispatch } from "react-redux";
import bin from "../assets/recycle-bin.svg";
import { DeleteBtn } from "./styled/DeleteBtn";
import { CreationDate } from "./CreationDate";
import { DatePick } from "./DatePick";

import todos, { selectFilteredTodos } from "../reducers/todos";

export const AllTodoList = () => {
  const items = useSelector((state) => selectFilteredTodos(state));

  const dispatch = useDispatch();

  const onToggleTodo = (id) => {
    dispatch(todos.actions.toggleTodo(id));
  };

  const onDeleteTodo = (id) => {
    dispatch(todos.actions.deleteTodo(id));
  };

  return (
    <section className="todo-wrapper">
      {items.map((item) => (
        <div className="one-todo-wrapper" key={item.id}>
          <div className="flex-item">
            <label className="switch">
              <input className="tick" type="checkbox" checked={item.isComplete} onChange={() => onToggleTodo(item.id)} />
              <span className="custom-checkbox" aria-label="decoration" />
            </label>
            <p className={item.isComplete ? "completed" : "uncompleted"}>{item.text}</p>
            <DeleteBtn width={20} height={20} onClick={() => onDeleteTodo(item.id)}>
              <img className="bin" aria-label="icon" alt="icon" src={bin} />
            </DeleteBtn>
          </div>
          <CreationDate item={item} />
          <span className="due-date" aria-label="date picker" role="button">
            due:
            <DatePick item={item} />
          </span>
        </div>
      ))}
    </section>
  );
};
