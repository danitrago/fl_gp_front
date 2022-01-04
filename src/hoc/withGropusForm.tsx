import React, { ComponentType, useRef, useState } from "react";
import {
  IFormStepProps,
  TSubmitAllGroups,
  TSubmitData,
} from "./withGropusForm.types";

export interface IFormGroup {
  id: number;
}

type TStepParameters = {
  submitedForms: number;
  stateSelector: string;
  nextStep: string;
  postAllData: boolean;
};

const withGropusForm = (Component: ComponentType<any>) => {
  const NewComponent = (props: IFormStepProps) => {
    const [formGroup, setFormGroup] = useState<IFormGroup[]>([
      {
        id: Date.now(),
      },
    ]);

    let stepParameters: TStepParameters = {
      submitedForms: 0,
      stateSelector: "",
      nextStep: "",
      postAllData: false,
    };

    const groupPanel = useRef<HTMLDivElement>(null);

    const submitAllGroups: TSubmitAllGroups = (
      newStateSelector,
      newNextStep,
      postAll
    ) => {
      stepParameters.submitedForms = 0;
      stepParameters.stateSelector = newStateSelector;
      stepParameters.nextStep = newNextStep;
      if (postAll) {
        stepParameters.postAllData = postAll;
      }
      const forms: any = groupPanel?.current?.getElementsByTagName("form");
      if (forms?.length) {
        [...forms].map((form) =>
          form.querySelector('input[type="submit"]').click()
        );
      }
    };

    const onSubmit: (data: TSubmitData) => void = (data: TSubmitData) => {
      stepParameters.submitedForms++;
      props.setToSubmitData((prev: any) => {
        if (prev) {
          if (prev[stepParameters.stateSelector]) {
            let filtered = prev[stepParameters.stateSelector]?.filter(
              (group: TSubmitData) =>
                group.crcf3_group_id_front !== data.crcf3_group_id_front
            );
            return {
              ...prev,
              [stepParameters.stateSelector]: [...filtered, data],
            };
          } else {
            return { ...prev, [stepParameters.stateSelector]: [data] };
          }
        } else {
          return { [stepParameters.stateSelector]: [data] };
        }
      });
      if (
        stepParameters.postAllData &&
        stepParameters.submitedForms === formGroup.length
      ) {
        if (props.postData) {
          props.postData(); // send data and finish flow
        }
      } else if (
        stepParameters.submitedForms === formGroup.length &&
        stepParameters.nextStep
      ) {
        props.setSelectedStep(stepParameters.nextStep); // only save data in state and set next step
      }
    };

    const addGroup = () => {
      setFormGroup((prev) => {
        return [
          ...prev,
          {
            id: Date.now(),
          },
        ];
      });
    };

    const removeGroup: (id: number, selector: string) => void = (
      id: number,
      selector: string
    ) => {
      setFormGroup((prev) => {
        return prev.filter((group) => group.id !== id);
      });
      props.setToSubmitData((prev: any) => {
        let filtered = prev?.[selector]?.filter(
          (group: TSubmitData) => group.crcf3_group_id_front != id
        );
        if (filtered) {
          return { ...prev, [selector]: [...filtered] };
        } else {
          return prev;
        }
      });
    };

    const deleteButton = (id: number, type: string) => {
      return (
        <a
          onClick={() => removeGroup(id, type)}
          className="text-sm text-red-500 font-bold cursor-pointer hover:underline underline-offset-4"
        >
          Eliminar
        </a>
      );
    };

    return (
      <Component
        formGroup={formGroup}
        groupPanel={groupPanel}
        removeGroup={removeGroup}
        onSubmit={onSubmit}
        addGroup={addGroup}
        submitAllGroups={submitAllGroups}
        deleteButton={deleteButton}
        {...props}
      />
    );
  };
  return NewComponent;
};

export default withGropusForm;
