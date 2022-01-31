import React, { ReactNode } from "react";

type TFieldsGridProps = {
  children?: ReactNode;
  gridCols?: 1 | 2 | 3 | 4;
  disabled?: boolean;
};

const calculateCols = (gridCols: number = 1) => {
  switch (gridCols) {
    case 2:
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-2";
    case 3:
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    case 4:
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    default:
      return "grid-cols-1";
  }
};

const FieldsGrid = (props: TFieldsGridProps) => {
  const { disabled = false } = props;
  return (
    <fieldset
      disabled={disabled}
      className={`grid ${calculateCols(props.gridCols)} gap-4 mb-6`}
    >
      {props.children}
    </fieldset>
  );
};

export default FieldsGrid;
