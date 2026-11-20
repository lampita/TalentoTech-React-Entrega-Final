import { FormularioProducto } from "./formularioProductos";
import { useState } from "react";
export function FormularioContainer() {
  const [datosForm, setDatosForm] = useState({
    id: "",
    stars: "",
    image: "",
    title: "",
    price: "",
    status: "",
    stock: "",
    categoria: "",
    descripcion: "",
  });
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm({ ...datosForm, [name]: value });
  };
  const manejarEnvio = (evento) => {
    evento.preventDefault();
    console.log("Enviando los siguientes datos a la API:", datosForm);
  };
  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
    />
  );
}
