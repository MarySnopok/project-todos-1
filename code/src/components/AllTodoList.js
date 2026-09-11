import React from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { ReactComponent as BinIcon } from "../assets/recycle-bin.svg";
import { DeleteBtn } from "./styled/DeleteBtn";
import { CreationDate } from "./CreationDate";
import { DatePick } from "./DatePick";

import todos, { selectFilteredTodos } from "../reducers/todos";

export const AllTodoList = () => {
  const items = useSelector(selectFilteredTodos);

  const dispatch = useDispatch();

  const onToggleTodo = (id) => {
    dispatch(todos.actions.toggleTodo(id));
  };

  const onDeleteTodo = (id) => {
    dispatch(todos.actions.deleteTodo(id));
  };

  return (
    <section className="todo-wrapper">
      {items.map((item) => {
        const isOverdue = item.dueDate ? dayjs(item.dueDate).isBefore(dayjs()) : false;
        return (
          <div className={`one-todo-wrapper${isOverdue ? " overdue" : ""}`} key={item.id}>
            <div className="flex-item">
              <label className="switch">
                <input
                  className="tick"
                  type="checkbox"
                  checked={item.isComplete}
                  onChange={() => onToggleTodo(item.id)}
                  aria-label={`Mark "${item.text}" as ${item.isComplete ? "not complete" : "complete"}`} />
                <span className="custom-checkbox" />
              </label>
              <p className={item.isComplete ? "completed" : "uncompleted"}>{item.text}</p>
              <DeleteBtn width={20} height={20} onClick={() => onDeleteTodo(item.id)} aria-label={`Delete "${item.text}"`}>
                <BinIcon className="bin" aria-hidden="true" />
              </DeleteBtn>
            </div>
            <CreationDate item={item} />
            <span className="due-date">
              due:
              <DatePick item={item} />
            </span>
          </div>
        );
      })}
    </section>
  );
};
