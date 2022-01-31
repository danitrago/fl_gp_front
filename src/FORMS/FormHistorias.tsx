import React, { useEffect } from "react";
import GroupHeader from "../components/GroupHeader";
import GroupSubmit from "../components/GroupSubmit";
import { fillFields, stringToOrderedList } from "../helpers";
import withFormRepeat from "../hoc/withFormRepeat";
import useRepeatingForm from "../hooks/useRepeatingForm";
import { THoCFormChildRepeat } from "../types/global";
import { FieldsGrid, TextArea } from "../ui-components/FormHooked";

const FormHistorias = (props: THoCFormChildRepeat) => {
  const { group } = props;

  const { ddl, disableFields, register, handleSubmit, errors, setValue } =
    useRepeatingForm();

  useEffect(() => {
    // fill fields
    fillFields(group, setValue);
  }, [group]);

  return (
    <form onSubmit={handleSubmit(props.submitIndividual)}>
      <GroupHeader
        title="Historia"
        id={group.crcf3_group_id_front}
        pos={props.pos}
        fnDelete={props.deleteGroup}
      />
      <FieldsGrid gridCols={3} disabled={disableFields}>
        {/* START REPLACING FIELDS HERE */}
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
        {/* END REPLACING FIELDS HERE */}
      </FieldsGrid>
      <GroupSubmit register={register} />
    </form>
  );
};

export default withFormRepeat(FormHistorias);
