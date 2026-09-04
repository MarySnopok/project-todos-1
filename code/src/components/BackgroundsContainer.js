import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import custom from "../reducers/custom";
import plus from "../assets/plus.svg";
import bin from "../assets/recycle-bin.svg";
import { BackgroundSelection } from "./styled/BackgroundSelection";

const MAX_DIMENSION = 1200;

const resizeImageToDataUrl = async (file) => {
  const bitmap = await createImageBitmap(file);
  let { width, height } = bitmap;

  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_DIMENSION) / width);
      width = MAX_DIMENSION;
    } else {
      width = Math.round((width * MAX_DIMENSION) / height);
      height = MAX_DIMENSION;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(bitmap, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", 0.82);
};

export const BackgroundContainer = () => {
  const dispatch = useDispatch();
  const bgs = useSelector((store) => store.custom.bgs);
  const customBackground = useSelector((store) => store.custom.customBackground);
  const selectedBackground = useSelector((store) => store.custom.selectedBackground);
  const fileInputRef = useRef(null);
  const [showRemove, setShowRemove] = useState(false);

  const isCustomSelected = Boolean(customBackground) && selectedBackground === customBackground;

  const changeBackground = (item) => {
    dispatch(custom.actions.selectBackground(item));
  };

  const removeCustomBackground = () => {
    dispatch(custom.actions.removeCustomBackground());
    setShowRemove(false);
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onCustomTileClick = () => {
    if (isCustomSelected) {
      setShowRemove(true);
    } else {
      changeBackground(customBackground);
    }
  };

  const onFileSelected = async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;

    const dataUrl = await resizeImageToDataUrl(file);
    dispatch(custom.actions.setCustomBackground(dataUrl));
  };

  return (
    <BackgroundSelection>
      {bgs.map((item) => (
        <button key={item} type="button" className="background-pic-wrapper" onClick={() => changeBackground(item)}>
          <img className="background-picture" src={item} alt={item} />
        </button>
      ))}

      {customBackground ? (
        <div className="background-pic-wrapper custom-slot" onMouseEnter={() => setShowRemove(true)} onMouseLeave={() => setShowRemove(false)}>
          <button
            type="button"
            className="custom-slot-select"
            onClick={onCustomTileClick}
            aria-label={isCustomSelected ? "Your custom background is selected. Tap again to show the remove button." : "Select your custom background"}>
            <img className="background-picture" src={customBackground} alt="Custom background" />
          </button>
          {showRemove && (
            <button type="button" className="custom-slot-remove" onClick={removeCustomBackground} aria-label="Remove custom background">
              <img src={bin} alt="" />
            </button>
          )}
        </div>
      ) : (
        <button type="button" className="background-pic-wrapper placeholder" onClick={openFilePicker} aria-label="Add a background image from your device">
          <span className="placeholder-blur" aria-hidden="true" />
          <span className="placeholder-plus-badge" aria-hidden="true">
            <img src={plus} alt="" />
          </span>
        </button>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileSelected} className="visually-hidden" />
    </BackgroundSelection>
  );
};
