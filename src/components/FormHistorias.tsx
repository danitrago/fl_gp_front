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

const FormHistorias = (props: any) => {
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
          <TextArea
            label="Descripción de la HU*"
            errors={errors}
            {...register("crcf3_titulo", { required: true })}
          />
          <TextArea
            label="Criterios de aceptación (1 por línea)*"
            placeholder="1. Criterio de aceptación uno&#x0a;2. Otro criterio de aceptación dos&#x0a;3. Criterio de aceptación tres"
            errors={errors}
            cols={2}
            {...register("crcf3_criterio", { required: true })}
          />
        </FieldsGrid>
        <input {...register("crcf3_group_id_front")} hidden />
        <input type="submit" hidden />
      </form>
    </div>
  );
};

export default withFormRepeat(FormHistorias);
