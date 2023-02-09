import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function InputField({ label, name, type, placeholder, value, onchange }) {
  const schema = yup.object().shape({
    name: yup.string().min(2).required(),
    password: yup.string().min(8).required(),
  });

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <label>{label}: </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        required
        // value={value || ''}
        value={value}
        onChange={onchange}
      />
      <p>{errors.name?.message}</p>
    </>
  );
}

export default InputField;
