import { FieldValues, UseFormSetValue } from "react-hook-form";
import { TGroupRepeatingFields } from "./interfaces/form-fields";

export const fillFields: (
  group: TGroupRepeatingFields,
  setValue: UseFormSetValue<FieldValues>
) => void = (
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

export const stringToOrderedList: (text: string) => string = (text: string) => {
  text = text.replace(/[0-9]. /g, "");
  var lines = text.split("\n");
  var result = lines
    .filter((line) => line.trim() !== "")
    .map((line, index) =>
      index + 1 === lines.length
        ? `${index + 1}. ${line}`
        : `${index + 1}. ${line}\n`
    )
    .join("");
  return result;
};
