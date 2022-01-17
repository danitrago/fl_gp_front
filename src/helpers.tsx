import { FieldValues, UseFormSetValue } from "react-hook-form";
import { TGroupRepeatingFields } from "./interfaces/FORM-FIELDS";

export const fillFields = (
  group: TGroupRepeatingFields,
  setValue: UseFormSetValue<FieldValues>
) => {
  if (group) {
    let keys: string[] = Object.keys(group);
    keys.map((key) => {
      setValue(key, group[key]);
    });
  }
};
