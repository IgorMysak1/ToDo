import React from "react";
import "../styles/button.scss";

export const Button = ({ img, handlerClick }) => {
  return (
    <div onClick={handlerClick} className="button">
      <img src={img} alt="" />
    </div>
  );
};
