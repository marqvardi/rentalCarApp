import React from "react";

const RenderInput = ({ input, label, type, meta: { error, touched } }) => (
  // console.log(input);

  <div className="field">
    <label>{label}</label>
    <input {...input} type={type} autoComplete="off" />
    <div style={{ color: "red" }}>{touched ? error : ""}</div>
  </div>
);

export default RenderInput;
