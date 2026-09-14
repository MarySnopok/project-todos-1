import React from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import { SelectionBtn } from "./styled/SelectionBtn";
import { PageNavBtn } from "./styled/PageNavBtn";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";

import todos, { MAX_PAGES, selectActiveItems, selectPageCount } from "../reducers/todos";
import custom from "../reducers/custom";

const PAGE_MARGIN_X = 15;
const PAGE_BOTTOM_LIMIT = 270;
const LINE_WIDTH = 180;

const buildTodosPdf = (listName, items) => {
  // jsPDF's exported class is intentionally lower-camel-cased by the library
  // eslint-disable-next-line new-cap
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(18);
  doc.text(listName, PAGE_MARGIN_X, y);
  y += 12;

  doc.setFontSize(12);
  if (items.length === 0) {
    doc.text("No todos yet.", PAGE_MARGIN_X, y);
  } else {
    items.forEach((item) => {
      const checkbox = item.isComplete ? "[x]" : "[ ]";
      const dueText = item.dueDate ? ` (due: ${dayjs(item.dueDate).format("DD MMM YYYY")})` : "";
      const wrapped = doc.splitTextToSize(`${checkbox} ${item.text}${dueText}`, LINE_WIDTH);

      doc.text(wrapped, PAGE_MARGIN_X, y);
      y += wrapped.length * 7 + 3;
      if (y > PAGE_BOTTOM_LIMIT) {
        doc.addPage();
        y = 20;
      }
    });
  }

  return doc.output("blob");
};

const downloadBlob = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};

export const InfoBoard = () => {
  const items = useSelector(selectActiveItems);
  const activePage = useSelector((store) => store.todos.activePage);
  const pageCount = useSelector(selectPageCount);
  const listName = useSelector((store) => store.custom.listNames[activePage]);
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

  const onExport = async () => {
    const blob = buildTodosPdf(listName, items);
    const fileName = `${listName.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "todo-list"}.pdf`;
    const file = new File([blob], fileName, { type: "application/pdf" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: listName });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }

    downloadBlob(blob, fileName);
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
      <div className="clear-btn-wrapper">
        <SelectionBtn onClick={onExport}>export</SelectionBtn>
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
