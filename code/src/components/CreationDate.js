import React from "react";
import dayjs from "dayjs";

export const CreationDate = ({ item }) => {
  return (
    <p className="set-date">
      <span className="label" aria-label="decoration">
        created:
      </span>{" "}
      {dayjs(item.creationDate).format("DD MMM YYYY HH:mm")}
    </p>
  );
};
