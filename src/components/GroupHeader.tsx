import React from "react";

type TGroupHeaderProps = {
  title: string;
  id: number;
  pos: number;
  fnDelete: (id: number) => void;
};

const GroupHeader = (props: TGroupHeaderProps) => {
  const { title, id, pos, fnDelete } = props;
  return (
    <div>
      <div className="flex justify-between">
        <h4 className="text-primary font-bold mb-3">
          {pos + 1}. {title} <small className="text-xs">({id})</small>
        </h4>
        <a
          onClick={() => fnDelete(id)}
          className="text-sm text-red-500 font-bold cursor-pointer hover:underline underline-offset-4"
        >
          Eliminar
        </a>
      </div>
    </div>
  );
};

export default GroupHeader;
