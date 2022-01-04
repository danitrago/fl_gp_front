import React from "react";
import withGropusForm, { IFormGroup } from "../hoc/withGropusForm";
import { TFormStep } from "../hoc/withGropusForm.types";
import Button from "../ui-components/Button";
import GroupRecursos from "./GroupRecursos";

const FormRecursos = (props: TFormStep) => {
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
            ddlOptions={props.ddlOptions}
            deleteButton={props.deleteButton}
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
