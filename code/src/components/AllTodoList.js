import React from "react";
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
import { ReactComponent as BinIcon } from "../assets/recycle-bin.svg";
import { DeleteBtn } from "./styled/DeleteBtn";
import { CreationDate } from "./CreationDate";
import { DatePick } from "./DatePick";

import todos, { selectFilteredTodos } from "../reducers/todos";

const SortableTodoItem = ({ item, onToggleTodo, onDeleteTodo }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.id });

  const isOverdue = item.dueDate ? dayjs(item.dueDate).isBefore(dayjs()) : false;
  const translateStyle = transform ? CSS.Translate.toString(transform) : undefined;

  const style = {
    transform: isDragging ? `${translateStyle ? `${translateStyle} ` : ""}scale(1.04)` : translateStyle,
    transition: isDragging ? "none" : transition,
    zIndex: isDragging ? 2 : undefined
  };

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
              onDeleteTodo={onDeleteTodo} />
          ))}
        </section>
      </SortableContext>
    </DndContext>
  );
};
