import React from "react";
import withForm from "../hoc/withForm";
import { IDdl, THoCFormChild } from "../types/global";
import {
  FieldsGrid,
  Input,
  Select,
  TextArea,
  Title
} from "../ui-components/FormHooked";

const FormCaracterizacion = (props: THoCFormChild) => {
  const { ddl, errors, register } = props;
  return (
    <React.Fragment>
      <Title title="Datos Generales" />
      <FieldsGrid gridCols={3}>
        <Select
          label="Tipo solicitud*"
          errors={errors}
          {...register("crcf3_id_tipo_solicitud", {
            required: true,
          })}
        >
          <option value="">Seleccionar...</option>
          {ddl.tipoSolicitudes.map((option: IDdl) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </Select>
        <Select
          label="Interventor del contrato*"
          errors={errors}
          {...register("crcf3_id_interventor_contrato", {
            required: true,
          })}
          cols={2}
        >
          <option value="">Seleccionar...</option>
          {ddl.interventores.map((option: IDdl) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </Select>
        <Select
          label="Tipo de necesidad*"
          errors={errors}
          {...register("crcf3_id_tipo_necesidad", {
            required: true,
          })}
        >
          <option value="">Seleccionar...</option>
          {ddl.listaNecesidad.map((option: IDdl) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </Select>
        <Input
          label="Ticket de servicio*"
          placeholder="ABC001"
          errors={errors}
          {...register("crcf3_numero_ticket_servicio", {
            required: true,
          })}
        />
        <Input
          label="Fecha límite de respuesta* (DD/MM/AAAA)"
          type="date"
          errors={errors}
          {...register("crcf3_fecha_limite", { required: true })}
        />
        <Input
          label="Módulo y/o funcionalidades relacionadas con la solicitud*"
          placeholder="Descripción del módulo*"
          errors={errors}
          cols={2}
          {...register("crcf3_modulo_funcionalidad", {
            required: true,
          })}
        />
        <Select
          label="Complejidad*"
          errors={errors}
          {...register("crcf3_id_complejidad", {
            required: true,
          })}
        >
          <option value="">Seleccionar...</option>
          {ddl.listaPrioridades.map((option: IDdl) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </Select>
      </FieldsGrid>
      <Title title="Descripción de la Necesidad" />
      <FieldsGrid>
        <TextArea
          label="Situación actual*"
          errors={errors}
          {...register("crcf3_situacionactual", { required: true })}
        />
        <TextArea
          label="Justificación*"
          errors={errors}
          {...register("crcf3_justificacion", { required: true })}
        />
        <TextArea
          label="Descripción de la necesidad*"
          errors={errors}
          {...register("crcf3_descripcion_necesidad", {
            required: true,
          })}
        />
        <TextArea
          label="Prerequisitos (Si aplica)"
          errors={errors}
          {...register("crcf3_prerrequisitos")}
        />
      </FieldsGrid>
    </React.Fragment>
  );
};

export default withForm(FormCaracterizacion);
