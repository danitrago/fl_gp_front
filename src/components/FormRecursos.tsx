import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import withFormRepeat from "../hoc/withFormRepeat";
import { IDdl } from "../interfaces/global";
import {
  FieldsGrid,
  Input,
  Select,
  TextArea,
} from "../ui-components/FormHooked";

const FormRecursos = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm();

  useEffect(() => {
    // fill fields
    if (props.group) {
      let keys = Object.keys(props.group);
      keys.map((key) => {
        setValue(key, props.group[key]);
      });
    }
  }, [props.group]);

  return (
    <div>
      <form onSubmit={handleSubmit(props.submitIndividual)}>
        <FieldsGrid gridCols={3}>
          <Select
            label="Tipo de consultor*"
            errors={errors}
            cols={2}
            {...register("crcf3_guid_tipo_consultor", {
              required: true,
            })}
          >
            <option value="">Seleccionar...</option>
            {props.ddl.tipoConsultores.map((option: IDdl) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </Select>
          {/* <Select
            label="Seniority"
            errors={errors}
            {...register("crcf3_guid_seniority", {
              required: true,
            })}
          >
            <option value="">Seleccionar...</option>
            {props.ddl.listaSeniority.map((option: IDdl) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </Select>
          <Input
            label="Cantidad de consultores*"
            type="number"
            errors={errors}
            {...register("crcf3_cantidad_consultores", {
              required: true,
            })}
          />
          <Input
            label="% Dedicación*"
            type="number"
            errors={errors}
            {...register("crcf3_porcentaje_dedicacion", {
              required: true,
            })}
          />
          <Input
            label="Tiempo requerido (días calendario)*"
            type="number"
            errors={errors}
            {...register("crcf3_tiempo_requerido", { required: true })}
          />
          <TextArea
            label="Observaciones"
            errors={errors}
            cols={3}
            {...register("crcf3_observaciones")}
          /> */}
        </FieldsGrid>
        <input {...register("crcf3_group_id_front")} hidden />
        <input type="submit" hidden />
      </form>
    </div>
  );
};

export default withFormRepeat(FormRecursos);
