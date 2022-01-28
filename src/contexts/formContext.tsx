import React from "react";
import { IFieldsData } from "../types/form-fields";

export type TFormContext = {
  toSubmitData: IFieldsData;
  setToSubmitData: any;
  ddl: any;
  postFormData: any;
  setSelectedStep: any;
  requestId: any;
};

const FormContext = React.createContext<TFormContext>({} as TFormContext);
export default FormContext;
