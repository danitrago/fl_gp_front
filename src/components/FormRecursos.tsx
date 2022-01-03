import React from "react";
import withGropusForm, { IFormGroup } from "../hoc/withGropusForm";
import Button from "../ui-components/Button";
import GroupRecursos from "./GroupRecursos";

export interface IFormRecursos {
  crcf3_group_id_front: number;
  crcf3_guid_tipo_consultor: string;
  crcf3_guid_seniority: string;
  crcf3_cantidad_consultores: number;
  crcf3_dedicacion: number;
  crcf3_tiempo_requerido: number;
  crcf3_obsrevaciones: string;
}

// interface IFormRecursosProps {
//   setSelectedStep: React.Dispatch<React.SetStateAction<string>>;
//   setToSubmitData: React.Dispatch<React.SetStateAction<IFieldsData | null>>;
//   demo: string;
// }

const FormRecursos = (props: any) => {
  return (
    <div ref={props.groupPanel}>
      <h3 className="text-lg font-bold">Recursos</h3>
      <span className="text-sm mb-5 block">
        Has seleccionado el tipo de solicitud (Recurso), por favor describe los
        detalles de el/los recursos.
      </span>
      {props.formGroup.map((group: IFormGroup, index: number) => {
        return (
          <GroupRecursos
            key={group.id}
            group={group}
            index={index}
            unique={props.formGroup.length === 1}
            removeGroup={props.removeGroup}
            onSubmit={props.onSubmit}
          />
        );
      })}

      <a
        onClick={props.addGroup}
        className="text-green-500 mx-auto text-center block font-bold cursor-pointer hover:underline underline-offset-4 mb-5"
      >
        + Agregar grupo
      </a>

      <div className="w-full mt-3 pt-3 flex justify-between">
        <Button onClick={() => props.setSelectedStep("Caracterización")}>
          Anterior
        </Button>
        <Button
          onClick={() => props.submitAllGroups("recursos", "Requerimientos")}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default withGropusForm(FormRecursos);
