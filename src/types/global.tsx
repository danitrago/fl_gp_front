import { ReactNode } from "react";
import { TGroupRepeatingFields } from "./form-fields";

export interface IDdl {
  id: number;
  label: string;
}
export type THoCForm = {
  querySelector: string;
  next: string;
  prev?: string;
};

export type THoCFormChild = THoCForm & {
  ddl: any;
  errors: any;
  register: any;
};

export type THoCFormChildRepeat = THoCForm & {
  pos: number;
  group: TGroupRepeatingFields;
  ddl: any;
  submitIndividual: (data: TGroupRepeatingFields) => void;
  deleteGroup: (id: number) => void;
};

export type TTempRepeating = {
  counterSubmit: number;
  dataTemp: TGroupRepeatingFields[];
};

type roleOptions = {
  [key: string]: string | number[] | ReactNode;
  selector: string;
  statusOn: number[];
  component: JSX.Element;
};

export type rolesMatrix = {
  [key: string]: roleOptions;
  leader: roleOptions;
  controller: roleOptions;
};
