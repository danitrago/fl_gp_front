import React, { ComponentType, useRef, useState } from "react";
import { IFormStepProps, TSubmitData } from "./withGropusForm.types";

export interface IFormGroup {
  id: number;
}

const withGropusForm = (Component: ComponentType<any>) => {
  const NewComponent = (props: IFormStepProps) => {
    const [formGroup, setFormGroup] = useState<IFormGroup[]>([
      {
        id: Date.now(),
      },
    ]);

    let submitedForms: number = 0;

    let stateSelector: string = "";

    let nextStep: string = "";

    let postAllData = false;

    const groupPanel = useRef<HTMLDivElement>(null);

    const submitAllGroups = (
      newStateSelector: string,
      newNextStep: string,
      postAll: boolean
    ) => {
      submitedForms = 0;
      stateSelector = newStateSelector;
      nextStep = newNextStep;
      postAllData = postAll;
      const forms: any = groupPanel?.current?.getElementsByTagName("form");
      if (forms?.length) {
        [...forms].map((form) =>
          form.querySelector('input[type="submit"]').click()
        );
      }
    };

    const onSubmit: any = (data: TSubmitData) => {
      submitedForms++;
      props.setToSubmitData((prev: any) => {
        if (prev) {
          if (prev[stateSelector]) {
            let filtered = prev[stateSelector]?.filter(
              (group: any) =>
                group.crcf3_group_id_front !== data.crcf3_group_id_front
            );
            return { ...prev, [stateSelector]: [...filtered, data] };
          } else {
            return { ...prev, [stateSelector]: [data] };
          }
        } else {
          return { [stateSelector]: [data] };
        }
      });
      if (postAllData && submitedForms === formGroup.length) {
        props.postData();
      } else if (submitedForms === formGroup.length && nextStep) {
        props.setSelectedStep(nextStep);
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

    const removeGroup = (id: number) => {
      setFormGroup((prev) => {
        return prev.filter((group) => group.id !== id);
      });
      props.setToSubmitData((prev: any) => {
        let filtered = prev?.recursos?.filter(
          (group: any) => group.crcf3_group_id_front != id
        );
        if (filtered) {
          return { ...prev, recursos: [...filtered] };
        } else {
          return prev;
        }
      });
    };

    return (
      <Component
        formGroup={formGroup}
        groupPanel={groupPanel}
        removeGroup={removeGroup}
        onSubmit={onSubmit}
        addGroup={addGroup}
        submitAllGroups={submitAllGroups}
        {...props}
      />
    );
  };
  return NewComponent;
};

export default withGropusForm;
