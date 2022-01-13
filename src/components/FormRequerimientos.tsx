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

const FormRequerimientos = (props: any) => {
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
            label="Tipo de requerimiento*"
            errors={errors}
            {...register("crcf3_guid_tipo_requisito", {
              required: true,
            })}
          >
            <option value="">Seleccionar...</option>
            {props.ddl.listaRequisitos.map((option: IDdl) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </Select>
          <TextArea
            label="Descripción*"
            errors={errors}
            cols={2}
            {...register("crcf3_titulo", { required: true })}
          />
        </FieldsGrid>
        <input {...register("crcf3_group_id_front")} hidden />
        <input type="submit" hidden />
      </form>
    </div>
  );
};

export default withFormRepeat(FormRequerimientos);
