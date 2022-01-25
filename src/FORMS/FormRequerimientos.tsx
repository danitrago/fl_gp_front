import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import GroupHeader from "../components/GroupHeader";
import GroupSubmit from "../components/GroupSubmit";
import { fillFields } from "../helpers";
import withFormRepeat from "../hoc/withFormRepeat";
import { IDdl, THoCFormChildRepeat } from "../types/global";
import { FieldsGrid, Select, TextArea } from "../ui-components/FormHooked";

const FormRequerimientos = (props: THoCFormChildRepeat) => {
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
        {/* END REPLAING FIELDS HERE */}
      </FieldsGrid>
      <GroupSubmit register={register} />
    </form>
  );
};

export default withFormRepeat(FormRequerimientos);
