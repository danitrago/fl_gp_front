import React, { ComponentType, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import ActionButtons from "../components/ActionButtons";
import FormContext, { TFormContext } from "../contexts/formContext";
import { IFieldsData, TFormFields } from "../types/form-fields";
import { THoCForm } from "../types/global";

const withForm = (Component: ComponentType<any>) => {
  // HOC COMPONENT
  const NewComponent = (props: THoCForm) => {
    const KEY_NAME: string = props.querySelector;

    const {
      toSubmitData,
      setToSubmitData,
      ddl,
      setSelectedStep,
      disableFields,
    } = useContext<TFormContext>(FormContext);

    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm();

    const onSubmit: (data: TFormFields) => void = (data: TFormFields) => {
      setToSubmitData((prev: IFieldsData) => {
        return { ...prev, [KEY_NAME]: data };
      });
      if (props.next) setSelectedStep(props.next);
    };

    const fillFields: () => void = () => {
      if (toSubmitData[KEY_NAME]) {
        let data: TFormFields = toSubmitData[KEY_NAME];
        let keys: string[] = Object.keys(data);
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
          <fieldset disabled={disableFields}>
            <Component
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              register={register}
              ddl={ddl}
              // {...props}
            />
          </fieldset>
          <ActionButtons {...props} />
        </form>
      </>
    );
  };
  return NewComponent;
};

export default withForm;
