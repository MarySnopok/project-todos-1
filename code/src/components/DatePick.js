import React, { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import todos from "../reducers/todos";

export const DatePick = ({ item }) => {
  const { dueDate } = item;
  const isOverdue = dueDate ? dayjs(dueDate).isBefore(dayjs()) : false;

  let statusClass = "unset";
  if (dueDate) {
    statusClass = isOverdue ? "outdated" : "valid";
  }

  const dispatch = useDispatch();

  const setDueDate = (date) => {
    dispatch(todos.actions.setDueDate({ item, date: date.getTime() }));
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button type="button" className={statusClass} aria-label="decoration" onClick={onClick} ref={ref}>
      {value || "select"}
    </button>
  ));
  return (
    <ReactDatePicker
      selected={dueDate ? new Date(dueDate) : undefined}
      onChange={(date) => setDueDate(date)}
      customInput={<ExampleCustomInput />} />
  );
};
