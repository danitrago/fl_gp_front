import React from "react";
import withGropusForm, { IFormGroup } from "../hoc/withGropusForm";
import { IFieldsData } from "../pages/Request";
import Button from "../ui-components/Button";
import GroupRequerimientos from "./GroupRequerimientos";

interface IFormRequerimientosProps {
  setSelectedStep: React.Dispatch<React.SetStateAction<string>>;
  setToSubmitData: React.Dispatch<React.SetStateAction<IFieldsData | null>>;
  demo: string;
}

const FormRequerimientos = (props: any) => {
  return (
    <div ref={props.groupPanel}>
      <h3 className="text-lg font-bold mb-3">Requerimientos Técnicos</h3>
      {/* <span className="text-sm mb-5 block">
        Has seleccionado el tipo de solicitud (Recurso), por favor describe los
        detalles de el/los recursos.
      </span> */}
      {props.formGroup.map((group: IFormGroup, index: number) => {
        return (
          <GroupRequerimientos
            key={group.id}
            group={group}
            index={index}
            unique={props.formGroup.length === 1}
            removeGroup={props.removeGroup}
            onSubmit={props.onSubmit}
            ddl={props.ddl}
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
        <Button onClick={() => props.setSelectedStep("Recursos")}>
          Anterior
        </Button>
        <Button onClick={() => props.submitAllGroups("requerimientos", "Historias")}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default withGropusForm(FormRequerimientos);
