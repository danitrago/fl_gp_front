import React, {
  ComponentType,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SubmitHandler } from "react-hook-form";
import ActionButtons from "../components/ActionButtons";
import AddGroupButton from "../components/AddGroupButton";
import FormContext, { TFormContext } from "../contexts/formContext";
import { IFieldsData, TGroupRepeatingFields } from "../interfaces/FORM-FIELDS";
import { THoCForm, TTempRepeating } from "../interfaces/global";
import CardGroup from "../ui-components/FormHooked/CardGroup";

const withFormRepeat = (Component: ComponentType<any>) => {
  // HOC COMPONENT
  const NewComponent = (props: THoCForm) => {
    const { toSubmitData, setToSubmitData, ddl, setSelectedStep } =
      useContext<TFormContext>(FormContext);

    const [groups, setGroups] = useState<TGroupRepeatingFields[]>([
      {
        crcf3_group_id_front: Date.now(),
      } as TGroupRepeatingFields,
    ]);

    const KEY_NAME: string = props.querySelector;

    const wrapperForms = useRef<HTMLDivElement>(null);

    const tempRef = useRef<TTempRepeating>({
      counterSubmit: 0,
      dataTemp: new Array(),
    });

    const addGroup: () => void = () => {
      setGroups((prev: TGroupRepeatingFields[]) => {
        return [
          ...prev,
          {
            crcf3_group_id_front: Date.now(),
          } as TGroupRepeatingFields,
        ];
      });
    };

    const deleteGroup: (id: number) => void = (id: number) => {
      setGroups((prev: TGroupRepeatingFields[]) => {
        let dummie: TGroupRepeatingFields[] = [...prev];
        return dummie.filter(
          (group: TGroupRepeatingFields) => group.crcf3_group_id_front != id
        );
      });
    };

    const submitIndividual: SubmitHandler<TGroupRepeatingFields> = (
      data: TGroupRepeatingFields
    ) => {
      tempRef.current.counterSubmit++;
      tempRef.current.dataTemp.push(data);
      if (tempRef.current.counterSubmit === groups.length) {
        setGroups(tempRef.current.dataTemp);
        setToSubmitData((prev: IFieldsData) => {
          let result = {
            ...prev,
            [KEY_NAME]: tempRef.current.dataTemp,
          };
          return result;
        });
        if (props.next) setSelectedStep(props.next);
      }
    };

    const submitAllGroups: () => void = () => {
      tempRef.current.counterSubmit = 0;
      tempRef.current.dataTemp = [];
      if (wrapperForms.current) {
        const forms: any = wrapperForms.current.querySelectorAll("form");
        for (let i = 0; i < forms.length; i++) {
          const groupForm: any = forms[i];
          let inputSubmit: HTMLInputElement = groupForm.querySelector(
            'input[type="submit"]'
          );
          if (inputSubmit) inputSubmit.click();
        }
      }
    };

    const populateFields: () => void = () => {
      if (toSubmitData[KEY_NAME]) {
        let data: TGroupRepeatingFields[] = toSubmitData[KEY_NAME];
        setGroups(data);
      }
    };

    useEffect(() => {
      // populate fields, in fetch for example
      populateFields();
    }, [toSubmitData]);

    return (
      <div ref={wrapperForms}>
        {groups.map((group, pos) => {
          return (
            <CardGroup key={group.crcf3_group_id_front}>
              <Component
                pos={pos}
                group={group}
                ddl={ddl}
                submitIndividual={submitIndividual}
                deleteGroup={deleteGroup}
                {...props}
              />
            </CardGroup>
          );
        })}
        <AddGroupButton fnAddGroup={addGroup} />
        <ActionButtons {...props} submitAllGroups={submitAllGroups} />
      </div>
    );
  };
  return NewComponent;
};

export default withFormRepeat;
