import React from "react";

export type TFormContext = {
  toSubmitData: any;
  setToSubmitData: any;
  ddl: any;
  postFormData: any;
  setSelectedStep: any;
  requestId: any;
};

const FormContext = React.createContext<TFormContext>({} as TFormContext);
export default FormContext;
