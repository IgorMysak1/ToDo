import React from "react";
import "../styles/button.scss";

export const Button = ({ img, handlerClick }) => {
  return (
    <div onClick={(elem, e) => handlerClick(elem, e)} className="button">
      <img src={img} alt="" />
    </div>
  );
};
