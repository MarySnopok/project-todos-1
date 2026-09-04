import React, { useState } from "react";
import { useDispatch } from "react-redux";
import plus from "../assets/plus.svg";
import { TodoInput } from "./styled/TodoInput";
import { InputBtn } from "./styled/InputBtn";
import todos from "../reducers/todos";

export const AddTodo = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const switchToAll = () => {
    dispatch(todos.actions.changeFilter("all"));
  };

  const onAddTodo = (e) => {
    if (input.trim() !== "") {
      dispatch(todos.actions.addTodo(input));
      setInput("");
    }
    e.preventDefault();
  };

  return (
    <form onSubmit={onAddTodo}>
      <div className="todo-input">
        <TodoInput height={30} width={218} value={input} type="input" min="1" onChange={(event) => setInput(event.target.value)} />
        <InputBtn onClick={switchToAll} type="submit">
          <img className="plus" src={plus} alt="plus" aria-label="plus" />
        </InputBtn>
      </div>
    </form>
  );
};
