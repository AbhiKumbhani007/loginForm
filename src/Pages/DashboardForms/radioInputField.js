import React from "react";

const RadioButton = ({ name, value, onChange, checked, children }) => (
  <>
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {children}
        </label>
        
  </>
);

export default RadioButton;
