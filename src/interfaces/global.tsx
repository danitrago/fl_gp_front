import { TGroupRepeatingFields } from "./form-fields";

export interface IDdl {
  id: string;
  label: string;
}
export type THoCForm = {
  querySelector: string;
  next: any;
  prev?: any;
};

export type THoCFormChildRepeat = THoCForm & {
  pos: number;
  group: TGroupRepeatingFields;
  ddl: any;
  submitIndividual: (data: any) => void;
  deleteGroup: (id: number) => void;
};
