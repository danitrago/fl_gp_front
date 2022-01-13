import React, {
  ComponentType,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import FormContext from "../context/formContext";
import { TFormRepeat } from "../interfaces/global";
import Button from "../ui-components/Button";
import { Title } from "../ui-components/FormHooked";

const withFormRepeat = (Component: ComponentType<any>) => {
  // HOC COMPONENT
  const NewComponent = (props: TFormRepeat) => {
    const FORM_CONFIG = {
      keyName: props.querySelector,
    };

    const { toSubmitData, setToSubmitData, ddl } = useContext(FormContext);

    const wrapperForms = useRef<HTMLDivElement>(null);

    const [groups, setGroups] = useState([
      {
        crcf3_group_id_front: Date.now(),
      },
    ]);

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

    const tempRef = useRef({
      counterSubmit: 0,
      dataTemp: new Array(),
    });

    const submitIndividual = (data: any) => {
      tempRef.current.counterSubmit++;
      tempRef.current.dataTemp.push(data);
      if (tempRef.current.counterSubmit === groups.length) {
        setGroups(tempRef.current.dataTemp);
        setToSubmitData((prev: any) => {
          let result = { ...prev, [FORM_CONFIG.keyName]: tempRef.current.dataTemp };
          return result;
        });
        props.submitCallback();
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

    // useEffect(() => {
    //   console.log('RENDER GROUPS')
    //   setToSubmitData((prev: any) => {
    //     let result = { ...prev, [FORM_CONFIG.keyName]: groups };
    //     return result;
    //   });
    //   if (
    //     tempRef.current.counterSubmit === groups.length &&
    //     props.submitCallback
    //   ) {
    //     props.submitCallback();
    //   }
    // }, [groups]);

    return (
      <div ref={wrapperForms}>
        <Title title={props.title} subTitle={props.subTitle} />
        {groups.map((group, pos) => {
          return (
            <div
              key={group.crcf3_group_id_front}
              className="p-3 border border-primary rounded-md shadow-lg mb-4"
            >
              <div className="flex justify-between">
                <h4 className="text-primary font-bold mb-3">
                  {pos + 1}. Grupo de {props.title}{" "}
                  <small className="text-xs">
                    ({group.crcf3_group_id_front})
                  </small>
                </h4>
                {groups.length > 1 && (
                  <a
                    onClick={() => deleteGroup(group.crcf3_group_id_front)}
                    className="text-sm text-red-500 font-bold cursor-pointer hover:underline underline-offset-4"
                  >
                    Eliminar
                  </a>
                )}
              </div>
              <Component
                group={group}
                submitIndividual={submitIndividual}
                ddl={ddl}
                {...props}
              />
            </div>
          );
        })}
        <a
          onClick={addGroup}
          className="text-green-500 mx-auto text-center block font-bold cursor-pointer hover:underline underline-offset-4 mb-5"
        >
          + Agregar grupo
        </a>
        <div className="w-full mt-3 pt-3 flex justify-end">
          <Button onClick={submitAllGroups}>Siguiente</Button>
        </div>
      </div>
    );
  };
  return NewComponent;
};

export default withFormRepeat;
