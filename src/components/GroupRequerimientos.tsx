import React from "react";
import { useForm } from "react-hook-form";
import { IFieldsRequerimientos } from "../interfaces/form-fields";
import { IDdl } from "../interfaces/global";
import Select from "../ui-components/Select";
import TextArea from "../ui-components/TextArea";

const GroupRequerimientos = (props: any) => {
  const { ddlOptions } = props;
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
          {!props.unique &&
            props.deleteButton(props.group.id, "requerimientos")}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* START FIELDS */}
          <div>
            <Select
              label="Tipo de requerimiento*"
              errors={errors}
              {...register("crcf3_guid_tipo_requisito", {
                required: true,
              })}
            >
              <option value="">Seleccionar...</option>
              {ddlOptions.listaRequisitos.map((option: IDdl) => (
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
          {/* END FIELDS */}
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
