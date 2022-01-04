import React from "react";
import { useForm } from "react-hook-form";
import { IFieldsHistorias } from "../interfaces/form-fields";
import TextArea from "../ui-components/TextArea";

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
          {!props.unique && props.deleteButton(props.group.id, "historias")}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* START FIELDS */}
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

export default GroupHistorias;
