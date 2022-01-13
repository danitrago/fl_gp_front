import { ReactNode } from "react";

export interface IDdl {
  id: string;
  label: string;
}
export type THoCForm = {
  // formData: any;
  // setFormData: any;
  querySelector: string;
  // ddl?: any;
  submitCallback?: any;
  next?: any;
  prev?: any;
};

export type TFormRepeat = {
  title: string;
  subTitle?: string;
  querySelector: string;
  // ddl?: any;
  submitCallback?: any;
  backStep?: string;
  children?: ReactNode;
  next?: any;
  prev?: any;
};

// export type TFormGroup = {
//   group: any;
//   pos: number;
//   setGroups: any;
//   deleteGroup: any;
//   deleteButton: any;
//   counterSuccess: any;
//   ddl?: any;
//   unique?: boolean;
// };
