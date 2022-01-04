import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFieldsCaracterizacion, IFieldsData } from "../interfaces/form-fields";
import { IDdl } from "../interfaces/global";
import Button from "../ui-components/Button";
import Input from "../ui-components/Input";
import Select from "../ui-components/Select";
import TextArea from "../ui-components/TextArea";
// const ddl = require("../assets/ddlOptions.json");

interface IFormCaracterizacionProps {
  setSelectedStep: React.Dispatch<React.SetStateAction<string>>;
  setToSubmitData: React.Dispatch<React.SetStateAction<IFieldsData>>;
  ddlOptions?: any;
  postData?: () => void;
}

const FormCaracterizacion = (props: IFormCaracterizacionProps) => {
  const { ddlOptions } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFieldsCaracterizacion>();

  const onSubmit: SubmitHandler<IFieldsCaracterizacion> = (
    data: IFieldsCaracterizacion
  ) => {
    props.setToSubmitData((prev: IFieldsData) => {
      return { ...prev, caracterizacion: data };
    });

    if (
      data.crcf3_guid_tipo_solicitud === "3ca21c8b-62df-4598-904b-eb0c2481356f"
    ) {
      props.setSelectedStep("Recursos");
    } else {
      props.setSelectedStep("Requerimientos");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-lg font-bold mb-3">Datos Generales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <Select
              label="Tipo solicitud*"
              errors={errors}
              {...register("crcf3_guid_tipo_solicitud", {
                required: true,
              })}
            >
              <option value="">Seleccionar...</option>
              {ddlOptions.tipoSolicitudes.map((option: IDdl) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="lg:col-span-2">
            <Select
              label="Interventor del contrato*"
              errors={errors}
              {...register("crcf3_guid_interventor_contrato", {
                required: true,
              })}
            >
              <option value="">Seleccionar...</option>
              {ddlOptions.interventores.map((option: IDdl) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Select
              label="Tipo de necesidad*"
              errors={errors}
              {...register("crcf3_guid_tipo_necesidad", {
                required: true,
              })}
            >
              <option value="">Seleccionar...</option>
              {ddlOptions.listaNecesidad.map((option: IDdl) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Input
              label="Ticket de servicio*"
              placeholder="ABC001"
              errors={errors}
              {...register("crcf3_numero_ticket_servicio", { required: true })}
            />
          </div>
          <div>
            <Input
              label="Fecha límite de respuesta*"
              type="date"
              errors={errors}
              {...register("crcf3_fecha_limite", { required: true })}
            />
          </div>

          <div className="lg:col-span-2">
            <Input
              label="Módulo y/o funcionalidades relacionadas con la solicitud*"
              placeholder="Descripción del módulo*"
              errors={errors}
              {...register("crcf3_modulo_funcionalidad", { required: true })}
            />
          </div>
          <div>
            <Select
              label="Prioridad*"
              errors={errors}
              {...register("crcf3_guid_complejidad", {
                required: true,
              })}
            >
              <option value="">Seleccionar...</option>
              {ddlOptions.listaPrioridades.map((option: IDdl) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <h3 className="text-lg font-bold mb-3">Descripción de la Necesidad</h3>
        <div className="grid gap-4">
          <div>
            <TextArea
              label="Situación actual*"
              errors={errors}
              {...register("crcf3_situacionactual", { required: true })}
            />
          </div>
          <div>
            <TextArea
              label="Justificación*"
              errors={errors}
              {...register("crcf3_justificacion", { required: true })}
            />
          </div>
          <div>
            <TextArea
              label="Descripción de la necesidad*"
              errors={errors}
              {...register("crcf3_descripcion_necesidad", { required: true })}
            />
          </div>
          <div>
            <TextArea
              label="Prerequisitos (Si aplica)"
              errors={errors}
              {...register("crcf3_prerrequisitos")}
            />
          </div>
        </div>
        <div className="w-full mt-3 pt-3 flex justify-end">
          <Button type="submit">Siguiente</Button>
        </div>
      </form>
    </div>
  );
};

export default FormCaracterizacion;
