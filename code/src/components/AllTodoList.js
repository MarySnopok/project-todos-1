import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  arrayMove
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";
import { DeleteBtn } from "./styled/DeleteBtn";
import { CreationDate } from "./CreationDate";
import { DatePick } from "./DatePick";

import todos, { selectFilteredTodos } from "../reducers/todos";

const moveCursorToEnd = (element) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
};

const SortableTodoItem = ({ item, onToggleTodo, onDeleteTodo, onEditTodoText }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.id });

  const [isEditingText, setIsEditingText] = useState(false);
  const textRef = useRef(null);

  const isOverdue = item.dueDate ? dayjs(item.dueDate).isBefore(dayjs()) : false;
  const daysOverdue = isOverdue
    ? dayjs().startOf("day").diff(dayjs(item.dueDate).startOf("day"), "day")
    : 0;
  const dueLabel = isOverdue ? `overdue by ${daysOverdue} day${daysOverdue === 1 ? "" : "s"}:` : "due:";
  const translateStyle = transform ? CSS.Translate.toString(transform) : undefined;

  const style = {
    transform: isDragging ? `${translateStyle ? `${translateStyle} ` : ""}scale(1.04)` : translateStyle,
    transition: isDragging ? "none" : transition,
    zIndex: isDragging ? 2 : undefined
  };

  const startEditingText = () => {
    setIsEditingText(true);
  };

  const onTextBlur = (e) => {
    const newText = e.currentTarget.textContent.trim();
    if (newText && newText !== item.text) {
      onEditTodoText(item.id, newText);
    } else {
      e.currentTarget.textContent = item.text;
    }
    setIsEditingText(false);
  };

  const onTextKeyDown = (e) => {
    // Without this, keystrokes bubble up to the card's drag-and-drop keyboard
    // listeners (from {...listeners} below), which treat Space as pick-up/drop
    // and swallow it instead of letting it type a space.
    e.stopPropagation();
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  useEffect(() => {
    if (isEditingText && textRef.current) {
      textRef.current.focus();
      moveCursorToEnd(textRef.current);
    }
  }, [isEditingText]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`one-todo-wrapper${isOverdue ? " overdue" : ""}${isDragging ? " dragging" : ""}`}
      {...attributes}
      {...listeners}>
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
        {/* contentEditable genuinely makes this interactive; jsx-a11y doesn't know that yet */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <p
          ref={textRef}
          contentEditable={isEditingText}
          suppressContentEditableWarning
          className={item.isComplete ? "completed" : "uncompleted"}
          onClick={startEditingText}
          onBlur={onTextBlur}
          onKeyDown={onTextKeyDown}>
          {item.text}
        </p>
        <DeleteBtn
          className="remove-todo-btn"
          width={20}
          height={20}
          onClick={() => onDeleteTodo(item.id)}
          aria-label={`Delete "${item.text}"`}>
          <PlusIcon className="remove-cross" aria-hidden="true" />
        </DeleteBtn>
      </div>
      <CreationDate item={item} />
      <span className="due-date">
        {dueLabel}
        <DatePick item={item} />
      </span>
    </div>
  );
};

export const AllTodoList = () => {
  const items = useSelector(selectFilteredTodos);

  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onToggleTodo = (id) => {
    dispatch(todos.actions.toggleTodo(id));
  };

  const onDeleteTodo = (id) => {
    dispatch(todos.actions.deleteTodo(id));
  };

  const onEditTodoText = (id, text) => {
    dispatch(todos.actions.editTodoText({ id, text }));
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    const newOrder = arrayMove(items, oldIndex, newIndex).map((item) => item.id);

    dispatch(todos.actions.reorderTodos(newOrder));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <section className="todo-wrapper">
          {items.map((item) => (
            <SortableTodoItem
              key={item.id}
              item={item}
              onToggleTodo={onToggleTodo}
              onDeleteTodo={onDeleteTodo}
              onEditTodoText={onEditTodoText} />
          ))}
        </section>
      </SortableContext>
    </DndContext>
  );
};
