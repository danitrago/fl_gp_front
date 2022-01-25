// 1. Configure los "types" de los campos para cada una de las partes del formulario "Wizard"
export type IFieldsCaracterizacion = {
  [key: string]: number | string;
  crcf3_id_tipo_solicitud: string;
  crcf3_id_interventor_contrato: string;
  crcf3_id_tipo_necesidad: string;
  crcf3_numero_ticket_servicio: string;
  crcf3_fecha_limite: string;
  crcf3_modulo_funcionalidad: string;
  crcf3_id_complejidad: string;
  crcf3_situacionactual: string;
  crcf3_justificacion: string;
  crcf3_descripcion_necesidad: string;
  crcf3_prerrequisitos: string;
  // crcf3_id_estado_solicitud: string;
  // crcf3_id_solicitante_lider: string;
};

export type IFieldsRecursos = {
  [key: string]: number | string;
  crcf3_group_id_front: string; // Para elementos repetitivos, se debe incluir este campo
  crcf3_id_tipo_consultor: string;
  crcf3_id_seniority: string;
  crcf3_cantidad_consultores: number;
  crcf3_porcentaje_dedicacion: number;
  crcf3_tiempo_requerido: number;
  crcf3_observaciones: string;
};

export type IFieldsRequerimientos = {
  [key: string]: number | string;
  crcf3_group_id_front: string; // Para elementos repetitivos, se debe incluir este campo
  crcf3_id_tipo_requisito: string;
  crcf3_titulo: string;
};

export type IFieldsHistorias = {
  [key: string]: number | string;
  crcf3_group_id_front: string; // Para elementos repetitivos, se debe incluir este campo
  crcf3_titulo: string;
  crcf3_criterio: string;
};

// 2. Configure el type del objeto para enviar en el submit del formulario, los campos repetitivos terminan en "[]"
export type IFieldsData = {
  caracterizacion?: IFieldsCaracterizacion;
  recursos?: IFieldsRecursos[];
  requerimientos?: IFieldsRequerimientos[];
  historias?: IFieldsHistorias[];
};

// 3. type para las partes del formulario que NO son grupos de campos repetitivos
export type TFormFields = IFieldsCaracterizacion; // OR los necesarios

// 4. type para las partes del formulario que SÍ son grupos de campos repetitivos
export type TGroupRepeatingFields =
  | IFieldsRecursos
  | IFieldsRequerimientos
  | IFieldsHistorias;
