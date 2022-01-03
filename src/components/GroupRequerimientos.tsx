import React, { ReactNode, SetStateAction, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IDdl } from "../interfaces/global";
import { IFieldsData } from "../pages/Request";
import Button from "../ui-components/Button";
import Input from "../ui-components/Input";
import Select from "../ui-components/Select";
import TextArea from "../ui-components/TextArea";
const ddl = require("../assets/ddl.json");

export interface IFieldsRequerimientos {
  crcf3_group_id_front: number;
  crcf3_guid_tipo_requisito: string;
  crcf3_titulo: string;
}

const GroupRequerimientos = (props: any) => {
  const { ddl } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFieldsRequerimientos>();

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="p-3 border border-primary rounded-md shadow-lg mb-4">
        <div className="flex justify-between">
          <h4 className="text-primary font-bold mb-3">
            REQ{props.index + 1}{" "}
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
            <Select
              label="Tipo de requerimiento*"
              errors={errors}
              {...register("crcf3_guid_tipo_requisito", {
                required: true,
              })}
            >
              <option value="">Seleccionar...</option>
              {ddl.tipoConsultores.map((option: IDdl) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="lg:col-span-2">
            <TextArea
              label="Descripción*"
              errors={errors}
              {...register("crcf3_titulo", { required: true })}
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

export default GroupRequerimientos;
