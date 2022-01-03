import React, { ReactNode, SetStateAction, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFieldsData } from "../pages/Request";
import Button from "../ui-components/Button";
import Input from "../ui-components/Input";
import Select from "../ui-components/Select";
import TextArea from "../ui-components/TextArea";
const ddl = require("../assets/ddl.json");

export interface IFieldsHistorias {
  crcf3_group_id_front: number;
  crcf3_titulo: string;
  crcf3_criterio: string;
}

const GroupHistorias = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFieldsHistorias>();

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="p-3 border border-primary rounded-md shadow-lg mb-4">
        <div className="flex justify-between">
          <h4 className="text-primary font-bold mb-3">
            HU{props.index + 1}{" "}
            <small className="text-xs">({props.group.id})</small>
          </h4>
          {!props.unique && (
            <a
              onClick={() => props.removeGroup(props.group.id)}
              className="text-sm text-red-500 font-bold cursor-pointer hover:underline underline-offset-4"
            >
              Eliminar
            </a>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <TextArea
              label="Descripción de la HU*"
              errors={errors}
              {...register("crcf3_titulo", { required: true })}
            />
          </div>
          <div className="lg:col-span-2">
            <TextArea
              label="Criterios de aceptación (1 por línea)*"
              placeholder="1. Criterio de aceptación uno&#x0a;2. Otro criterio de aceptación dos&#x0a;3. Criterio de aceptación tres"
              errors={errors}
              {...register("crcf3_criterio", { required: true })}
            />
          </div>
        </div>
      </div>
      <input
        {...register("crcf3_group_id_front")}
        type="number"
        value={props.group.id || null}
        hidden
      />
      <input type="submit" hidden />
    </form>
  );
};

export default GroupHistorias;
