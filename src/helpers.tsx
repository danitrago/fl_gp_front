import { FieldValues, UseFormSetValue } from "react-hook-form";
import {
  IFieldsData,
  TFormFields,
  TGroupRepeatingFields,
} from "./types/form-fields";

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
  text = text.replace(/[0-9]\. /g, "");
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

export const getApiUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEVELOP
    : process.env.REACT_APP_API_PRODUCTION;
};

export const processData = (original: IFieldsData) => {
  let process = {
    ...original.caracterizacion,
    crcf3_solicitud_recursos: original.recursos,
    crcf3_solicitud_requisitos: original.requerimientos,
    crcf3_solicitud_hus: original.historias,
  };

  return process;
};
