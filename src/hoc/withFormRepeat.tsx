import React, {
  ComponentType,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ActionButtons from "../components/ActionButtons";
import AddGroupButton from "../components/AddGroupButton";
import FormContext from "../context/formContext";
import { THoCForm } from "../interfaces/global";
import CardGroup from "../ui-components/FormHooked/CardGroup";

const withFormRepeat = (Component: ComponentType<any>) => {
  // HOC COMPONENT
  const NewComponent = (props: THoCForm) => {
    const { toSubmitData, setToSubmitData, ddl, setSelectedStep } =
      useContext(FormContext);

    const [groups, setGroups] = useState([
      {
        crcf3_group_id_front: Date.now(),
      },
    ]);

    const FORM_CONFIG = {
      keyName: props.querySelector,
    };

    const wrapperForms = useRef<HTMLDivElement>(null);

    const tempRef = useRef({
      counterSubmit: 0,
      dataTemp: new Array(),
    });

    const addGroup = () => {
      setGroups((prev: any) => {
        return [
          ...prev,
          {
            crcf3_group_id_front: Date.now(),
          },
        ];
      });
    };

    const deleteGroup = (id: number) => {
      setGroups((prev: any) => {
        let dummie = [...prev];
        return dummie.filter((group) => group.crcf3_group_id_front != id);
      });
    };

    const submitIndividual = (data: any) => {
      tempRef.current.counterSubmit++;
      tempRef.current.dataTemp.push(data);
      if (tempRef.current.counterSubmit === groups.length) {
        setGroups(tempRef.current.dataTemp);
        setToSubmitData((prev: any) => {
          let result = {
            ...prev,
            [FORM_CONFIG.keyName]: tempRef.current.dataTemp,
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
      if (toSubmitData[FORM_CONFIG.keyName]) {
        let data = toSubmitData[FORM_CONFIG.keyName];
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
