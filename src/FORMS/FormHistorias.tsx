import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import GroupHeader from "../components/GroupHeader";
import GroupSubmit from "../components/GroupSubmit";
import { fillFields, stringToOrderedList } from "../helpers";
import withFormRepeat from "../hoc/withFormRepeat";
import { THoCFormChildRepeat } from "../interfaces/global";
import { FieldsGrid, TextArea } from "../ui-components/FormHooked";

const FormHistorias = (props: THoCFormChildRepeat) => {
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
            onBlur={(e) => {
              setValue("crcf3_criterio", stringToOrderedList(e.target.value));
            }}
          />
          {/* END REPLAING FIELDS HERE */}
        </FieldsGrid>
        <GroupSubmit register={register} />
      </form>
    </div>
  );
};

export default withFormRepeat(FormHistorias);
