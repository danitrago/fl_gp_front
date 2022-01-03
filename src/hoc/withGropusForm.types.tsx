import { IFormRecursos } from "../components/FormRecursos";
import { IFieldsHistorias } from "../components/GroupHistorias";
import { IFieldsRequerimientos } from "../components/GroupRequerimientos";
import { IFieldsData } from "../pages/Request";

export type TSubmitData =
  | IFormRecursos
  | IFieldsRequerimientos
  | IFieldsHistorias;

export interface IFormStepProps {
  setSelectedStep: React.Dispatch<React.SetStateAction<string>>;
  setToSubmitData: React.Dispatch<React.SetStateAction<IFieldsData | null>>;
  demo?: string;
  ddl?: any;
  postData?: any;
}
