import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import FormContext from "../contexts/formContext";

const useRepeatingForm = () => {
  const { ddl } = useContext(FormContext);
  const { disableFields } = useContext(FormContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  return {
    ddl,
    disableFields,
    register,
    handleSubmit,
    errors,
    setValue,
  };
};

export default useRepeatingForm;
