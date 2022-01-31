import React, { useEffect } from "react";
import GroupHeader from "../components/GroupHeader";
import GroupSubmit from "../components/GroupSubmit";
import { fillFields } from "../helpers";
import withFormRepeat from "../hoc/withFormRepeat";
import useRepeatingForm from "../hooks/useRepeatingForm";
import { IDdl, THoCFormChildRepeat } from "../types/global";
import { FieldsGrid, Select, TextArea } from "../ui-components/FormHooked";

const FormRequerimientos = (props: THoCFormChildRepeat) => {
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
        title="Requerimiento"
        id={group.crcf3_group_id_front}
        pos={props.pos}
        fnDelete={props.deleteGroup}
      />
      <FieldsGrid gridCols={3} disabled={disableFields}>
        {/* START REPLACING FIELDS HERE */}
        <Select
          label="Tipo de requerimiento*"
          errors={errors}
          {...register("crcf3_id_tipo_requisito", {
            required: true,
          })}
        >
          <option value="">Seleccionar...</option>
          {ddl.listaRequisitos.map((option: IDdl) => (
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
        {/* END REPLACING FIELDS HERE */}
      </FieldsGrid>
      <GroupSubmit register={register} />
    </form>
  );
};

export default withFormRepeat(FormRequerimientos);
