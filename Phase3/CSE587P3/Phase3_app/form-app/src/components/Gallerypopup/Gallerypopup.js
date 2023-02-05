import React from "react";
import "./Gallerypopup.css";
import { Gallery } from "../Gallery/Gallery";

export const Gallerypopup = ({ text, closePopup }) => {
  return (
    <div className="popup-container1">
      <div className="popup-body1">
        <Gallery className="gallery" />
        <button className="closebutton" onClick={closePopup}>
          <b>X</b>
        </button>
      </div>
    </div>
  );
};
