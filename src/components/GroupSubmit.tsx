import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type TGroupSubmit = {
  register: UseFormRegister<FieldValues>;
};

const GroupSubmit = (props: TGroupSubmit) => {
  const { register } = props;
  return (
    <>
      <input {...register("crcf3_group_id_front")} hidden />
      <input type="submit" hidden />
    </>
  );
};

export default GroupSubmit;
