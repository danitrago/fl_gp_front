import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import GroupHeader from "../components/GroupHeader";
import GroupSubmit from "../components/GroupSubmit";
import { fillFields } from "../helpers";
import withFormRepeat from "../hoc/withFormRepeat";
import { IDdl, THoCFormChildRepeat } from "../interfaces/global";
import {
  FieldsGrid,
  Input,
  Select,
  TextArea
} from "../ui-components/FormHooked";

const FormRecursos = (props: THoCFormChildRepeat) => {
  const { group, ddl } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    // fill fields
    fillFields(group, setValue);
  }, [group]);

  return (
    <div>
      <form onSubmit={handleSubmit(props.submitIndividual)}>
        <GroupHeader
          title="Grupo de Recursos"
          id={group.crcf3_group_id_front}
          pos={props.pos}
          fnDelete={props.deleteGroup}
        />
        <FieldsGrid gridCols={3}>
          {/* START REPLAING FIELDS HERE */}
          <Select
            label="Tipo de consultor*"
            errors={errors}
            cols={2}
            {...register("crcf3_guid_tipo_consultor", {
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
          <Select
            label="Seniority"
            errors={errors}
            {...register("crcf3_guid_seniority", {
              required: true,
            })}
          >
            <option value="">Seleccionar...</option>
            {ddl.listaSeniority.map((option: IDdl) => (
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
          />
          {/* END REPLAING FIELDS HERE */}
        </FieldsGrid>
        <GroupSubmit register={register} />
      </form>
    </div>
  );
};

export default withFormRepeat(FormRecursos);
