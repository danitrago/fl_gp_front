// PLEASE CONFIGURE THIS FILE
// PLEASE CONFIGURE THIS FILE
// PLEASE CONFIGURE THIS FILE
export interface IFieldsCaracterizacion {
  [key: string]: number | string;
  crcf3_guid_tipo_solicitud: string;
  crcf3_guid_interventor_contrato: string;
  crcf3_guid_tipo_necesidad: string;
  crcf3_numero_ticket_servicio: number;
  crcf3_fecha_limite: string;
  crcf3_modulo_funcionalidad: string;
  crcf3_guid_complejidad: string;
  crcf3_situacionactual: string;
  crcf3_justificacion: string;
  crcf3_descripcion_necesidad: string;
  crcf3_prerrequisitos: string;
  // crcf3_guid_estado_solicitud: string;
  // crcf3_guid_solicitante_lider: string;
}

export interface IFieldsRecursos {
  [key: string]: number | string;
  crcf3_group_id_front: number;
  crcf3_guid_tipo_consultor: string;
  crcf3_guid_seniority: string;
  crcf3_cantidad_consultores: number;
  crcf3_porcentaje_dedicacion: number;
  crcf3_tiempo_requerido: number;
  crcf3_observaciones: string;
}

export interface IFieldsRequerimientos {
  [key: string]: number | string;
  crcf3_group_id_front: number;
  crcf3_guid_tipo_requisito: string;
  crcf3_titulo: string;
}

export interface IFieldsHistorias {
  [key: string]: number | string;
  crcf3_group_id_front: number;
  crcf3_titulo: string;
  crcf3_criterio: string;
}

// type object to submit
export interface IFieldsData {
  caracterizacion?: IFieldsCaracterizacion;
  recursos?: IFieldsRecursos;
  requerimientos?: IFieldsRequerimientos;
  historias?: IFieldsHistorias;
}

// type group for ONLY repeating forms
export type TGroupRepeatingFields =
  | IFieldsRecursos
  | IFieldsRequerimientos
  | IFieldsHistorias;
