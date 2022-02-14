import { FieldValues, UseFormSetValue } from "react-hook-form";
import {
  IFieldsData,
  TFormFields,
  TGroupRepeatingFields
} from "./types/form-fields";
import swal from "sweetalert";
import moment from "moment";

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

export const getRedirectUri = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_REDIRECT_URI_DEV
    : process.env.REACT_APP_REDIRECT_URI_PRD;
};

export const processData = (original: IFieldsData) => {
  let process = {
    ...original.caracterizacion,
    crcf3_solicitud_recursos: original.recursos,
    crcf3_solicitud_requisitos: original.requerimientos,
    crcf3_solicitud_hus: original.historias
  };

  return process;
};

export const alertMsg = (
  title: string,
  msg: string,
  type: "error" | "warning" | "success"
) => {
  swal(title, msg, type);
};

export const formatDate = (date: string) => {
  return moment(new Date(date)).format("DD MMM YY");
};

export const processDataToDownload = (data: any[]) => {
  return data.map((item) => {
    return {
      ID: item.crcf3_id_solicitud,
      Tipo: item.crcf3_id_tipo_solicitud,
      Estado: item.crcf3_id_estado_solicitud,
      Solicitante: item.crcf3_id_solicitante_lider,
      Interventor: item.crcf3_id_interventor_contrato,
      Proveedor: item.crcf3_id_proveedor,
      "Tipo Necesidad": item.crcf3_id_tipo_necesidad,
      "Ticket Servicio": item.crcf3_numero_ticket_servicio,
      "Fecha Límite": item.crcf3_fecha_limite,
      "Módulo/Funcionalidad": item.crcf3_modulo_funcionalidad,
      Complejidad: item.crcf3_id_complejidad,
      Creación: item.createdon
    };
  });
};

export let headersAuth = () => {
  return {
    Authorization: `Bearer ${window.sessionStorage.getItem("user-jwt")}`,
    "Content-Type": "application/json"
  };
};
