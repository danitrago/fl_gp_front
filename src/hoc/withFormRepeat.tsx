import React, {
  ComponentType,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ActionButtons from "../components/ActionButtons";
import AddGroupButton from "../components/AddGroupButton";
import FormContext, { TFormContext } from "../context/formContext";
import { IFieldsData, TGroupRepeatingFields } from "../interfaces/form-fields";
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

    const submitIndividual = (data: TGroupRepeatingFields) => {
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

    const submitAllGroups = () => {
      tempRef.current.counterSubmit = 0;
      tempRef.current.dataTemp = [];
      if (wrapperForms.current) {
        const forms: any = wrapperForms.current.querySelectorAll("form");
        console.log(forms);
        for (let i = 0; i < forms.length; i++) {
          console.log("for", i);
          const groupForm = forms[i];
          let inputSubmit = groupForm.querySelector('input[type="submit"]');
          inputSubmit.click();
        }
      }
    };

    const populateGroupsWithFetch = () => {
      if (toSubmitData[KEY_NAME]) {
        let data = toSubmitData[KEY_NAME];
        setGroups(data);
      }
    };

    useEffect(() => {
      populateGroupsWithFetch();
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