import React from "react";
import { IFieldsData } from "../types/form-fields";

export type TFormContext = {
  toSubmitData: IFieldsData;
  setToSubmitData: (value: React.SetStateAction<IFieldsData>) => void;
  ddl: any;
  postFormData: (data: IFieldsData) => Promise<void>;
  setSelectedStep: React.Dispatch<React.SetStateAction<string>>;
  requestId?: string;
  disableFields: boolean;
};

const FormContext = React.createContext<TFormContext>({} as TFormContext);
export default FormContext;
