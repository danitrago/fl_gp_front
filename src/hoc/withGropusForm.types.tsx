import {
  IFieldsData,
  IFieldsHistorias,
  IFieldsRecursos,
  IFieldsRequerimientos,
} from "../interfaces/form-fields";
import { IFormGroup } from "./withGropusForm";

export type TSubmitData =
  | IFieldsRecursos
  | IFieldsRequerimientos
  | IFieldsHistorias;
export interface IFormStepProps {
  setSelectedStep: React.Dispatch<React.SetStateAction<string>>;
  setToSubmitData: React.Dispatch<React.SetStateAction<IFieldsData>>;
  ddlOptions?: any;
  postData?: (data: IFieldsData) => void;
}

export type TSubmitAllGroups = (
  newStateSelector: string,
  newNextStep: string,
  postAll?: boolean
) => void;

export type TFormStep = {
  formGroup: IFormGroup[];
  groupPanel: React.RefObject<HTMLDivElement>;
  removeGroup: (id: number) => void;
  onSubmit: (data: TSubmitData) => void;
  addGroup: () => void;
  submitAllGroups: TSubmitAllGroups;
  deleteButton: () => void;
} & IFormStepProps;
