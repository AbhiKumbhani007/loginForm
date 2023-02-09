import React from "react";

const Dropdowm = ({
  id,
  name,
  options,
  handleChange,
  selectedValue,
}) => (
  <>
        <select id={id} name={name} onChange={handleChange} value={selectedValue}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </>
);

export default Dropdowm;
