import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SelectionBtn } from "./styled/SelectionBtn";
import { PageNavBtn } from "./styled/PageNavBtn";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";

import todos, { MAX_PAGES, selectActiveItems, selectPageCount } from "../reducers/todos";
import custom from "../reducers/custom";

export const InfoBoard = () => {
  const items = useSelector(selectActiveItems);
  const activePage = useSelector((store) => store.todos.activePage);
  const pageCount = useSelector(selectPageCount);
  const dispatch = useDispatch();

  const uncompletedTasks = items.filter((item) => {
    return !item.isComplete;
  }).length;

  const onDeleteCompletedTasks = () => {
    dispatch(todos.actions.deleteCompletedTasks());
  };

  const switchToPage = (pageIndex) => {
    dispatch(todos.actions.activatePage(pageIndex));
    dispatch(custom.actions.activatePage(pageIndex));
  };

  return (
    <section className="todo-wrapper">
      <div className="info-wrapper">
        <p>
          total:{" "}
          <span className="decoration" aria-label="decoration">
            {items.length}
          </span>{" "}
        </p>
        <p>
          tasks left:{" "}
          <span className="decoration" aria-label="decoration">
            {uncompletedTasks}
          </span>{" "}
        </p>
      </div>
      <div className="clear-btn-wrapper">
        <SelectionBtn onClick={onDeleteCompletedTasks}>clear completed</SelectionBtn>
      </div>
      <div className="page-nav-wrapper">
        {Array.from({ length: pageCount }, (page, pageIndex) => (
          <PageNavBtn
            // eslint-disable-next-line react/no-array-index-key
            key={pageIndex}
            onClick={() => switchToPage(pageIndex)}
            aria-current={activePage === pageIndex ? "true" : undefined}
            aria-label={`Switch to todo list ${pageIndex + 1}`}>
            {pageIndex + 1}
          </PageNavBtn>
        ))}
        {pageCount < MAX_PAGES ? (
          <PageNavBtn onClick={() => switchToPage(pageCount)} aria-label="Add a new todo list">
            <PlusIcon aria-hidden="true" />
          </PageNavBtn>
        ) : null}
      </div>
    </section>
  );
};
