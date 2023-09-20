import React from "react";
import "./BouncingLoader.css";

const BouncingDotsLoader = (props) => {
  return (
    <div className="bouncing-loader">
      <div style={{ backgroundColor: "grey" }}></div>
      <div style={{ backgroundColor: "silver" }}></div>
      <div style={{ backgroundColor: "gray" }}></div>
    </div>
  );
};

export default BouncingDotsLoader;
