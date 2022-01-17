import React, { ComponentType, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import ActionButtons from "../components/ActionButtons";
import FormContext from "../contexts/formContext";
import { IFieldsData } from "../interfaces/FORM-FIELDS";
import { THoCForm } from "../interfaces/global";

const withForm = (Component: ComponentType<any>) => {
  // HOC COMPONENT
  const NewComponent = (props: THoCForm) => {
    const FORM_CONFIG = {
      keyName: props.querySelector,
    };
    const { toSubmitData, setToSubmitData, ddl, setSelectedStep } =
      useContext(FormContext);

    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm();

    const onSubmit = (data: any) => {
      setToSubmitData((prev: IFieldsData) => {
        return { ...prev, [FORM_CONFIG.keyName]: data };
      });
      if (props.next) setSelectedStep(props.next);
    };

    const fillFields = () => {
      //   console.log("populating fields", FORM_CONFIG.keyName);
      if (toSubmitData[FORM_CONFIG.keyName]) {
        let data = toSubmitData[FORM_CONFIG.keyName];
        let keys = Object.keys(data);
        keys.map((key) => {
          setValue(key, data[key]);
        });
      }
    };

    useEffect(() => {
      fillFields();
    }, [toSubmitData]);

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Component
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            register={register}
            ddl={ddl}
            {...props}
          />
          <ActionButtons {...props} />
        </form>
      </>
    );
  };
  return NewComponent;
};

export default withForm;
