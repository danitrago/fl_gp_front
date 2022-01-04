import React from "react";
import { useForm } from "react-hook-form";
import { IFieldsRecursos } from "../interfaces/form-fields";
import { IDdl } from "../interfaces/global";
import Input from "../ui-components/Input";
import Select from "../ui-components/Select";
import TextArea from "../ui-components/TextArea";

const GroupRecursos = (props: any) => {
  const { ddlOptions } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFieldsRecursos>();

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="p-3 border border-primary rounded-md shadow-lg mb-4">
        <div className="flex justify-between">
          <h4 className="text-primary font-bold mb-3">
            {props.index + 1}. Grupo de Recursos{" "}
            <small className="text-xs">({props.group.id})</small>
          </h4>
          {!props.unique && props.deleteButton(props.group.id, "recursos")}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* START FIELDS */}
          <div className="lg:col-span-2">
            <Select
              label="Tipo de consultor*"
              errors={errors}
              {...register("crcf3_guid_tipo_consultor", {
                required: true,
              })}
            >
              <option value="">Seleccionar...</option>
              {ddlOptions.tipoConsultores.map((option: IDdl) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Select
              label="Seniority"
              errors={errors}
              {...register("crcf3_guid_seniority", {
                required: true,
              })}
            >
              <option value="">Seleccionar...</option>
              {ddlOptions.listaSeniority.map((option: IDdl) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Input
              label="Cantidad de consultores*"
              type="number"
              errors={errors}
              {...register("crcf3_cantidad_consultores", {
                required: true,
              })}
            />
          </div>
          <div>
            <Input
              label="% Dedicación*"
              type="number"
              errors={errors}
              {...register("crcf3_porcentaje_dedicacion", { required: true })}
            />
          </div>
          <div>
            <Input
              label="Tiempo requerido (días calendario)*"
              type="number"
              errors={errors}
              {...register("crcf3_tiempo_requerido", { required: true })}
            />
          </div>
          <div className="lg:col-span-3">
            <TextArea
              label="Observaciones"
              errors={errors}
              {...register("crcf3_observaciones")}
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

export default GroupRecursos;
