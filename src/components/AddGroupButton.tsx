import React from "react";

type TAddGroupButtonProps = {
  fnAddGroup: () => void;
};

const AddGroupButton = (props: TAddGroupButtonProps) => {
  return (
    <a
      onClick={props.fnAddGroup}
      className="text-green-500 mx-auto text-center block font-bold cursor-pointer hover:underline underline-offset-4 mb-5"
    >
      + Agregar grupo
    </a>
  );
};

export default AddGroupButton;
