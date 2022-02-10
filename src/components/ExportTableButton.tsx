import React from "react";
import exportFromJSON from "export-from-json";
import Button from "../ui-components/Button";

const fileName = "requests";
const exportType = "xls";

type TExportTableButtonProps = {
  data: {}[];
};

const ExportTableButton = (props: TExportTableButtonProps) => {
  const { data } = props;
  return (
    <div className="fixed right-3 bottom-3">
      <Button
        className="shadow-xl opacity-40 hover:opacity-100"
        onClick={() => {
          exportFromJSON({ data, fileName, exportType });
        }}
      >
        <i className="fa fa-download mr-2"></i>descargar
      </Button>
    </div>
  );
};

export default ExportTableButton;
