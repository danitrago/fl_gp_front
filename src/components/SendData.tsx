import React, { useContext } from "react";
import FormContext from "../context/formContext";
import Button from "../ui-components/Button";
import sendImg from "../assets/send.jpg";

type TSendDataProps = {
  prev: string;
};

const SendData = (props: TSendDataProps) => {
  const { postFormData, setSelectedStep } = useContext(FormContext);
  return (
    <div className="pt-5">
      <img src={sendImg} alt="Enviar formulario" className="w-1/5 mx-auto mb-5" />
      <h2 className="text-primary text-center font-bold text-xl">
        Enviar Datos
      </h2>
      <p className="text-center">
        Estás a punto de enviar todos los datos del formulario, ¿Estás seguro?
      </p>
      <div className="flex justify-between mt-8">
        <Button onClick={() => setSelectedStep(props.prev)}>Volver</Button>
        <Button onClick={postFormData}>Enviar</Button>
      </div>
    </div>
  );
};

export default SendData;
