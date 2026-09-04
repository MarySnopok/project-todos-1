import React from "react";
import { useDispatch, useSelector } from "react-redux";
import custom from "../reducers/custom";
import { BackgroundSelection } from "./styled/BackgroundSelection";

export const BackgroundContainer = () => {
  const dispatch = useDispatch();
  const bgs = useSelector((store) => store.custom.bgs);
  const changeBackground = (item) => {
    dispatch(custom.actions.selectBackground(item));
  };

  return (
    <BackgroundSelection>
      {bgs.map((item) => (
        <button key={item} type="button" className="background-pic-wrapper" onClick={() => changeBackground(item)}>
          <img className="background-picture" src={item} alt={item} />
        </button>
      ))}
    </BackgroundSelection>
  );
};
