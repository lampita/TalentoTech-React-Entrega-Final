import { FormularioCupones } from "./FormularioCupones";
import { useState } from "react";
import { db } from "../../firestore/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Spinner } from "../Spinner/Spinner";

const estadoInicial = {
  codigo: "",
  descripcion: "",
  descuento: "",
  vencimiento: "",
};

export function FormularioContainerCupones({ recargarCupones }) {
  const [datosForm, setDatosForm] = useState(estadoInicial);
  const [cargando, setCargando] = useState(false);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejarEnvio = async (evento, codigoFinal) => {
    evento.preventDefault();

    const codigoLimpio = String(codigoFinal || "").trim();

    if (!codigoLimpio) {
      alert("Por favor, ingresá un código válido para el cupón.");
      return;
    }

    setCargando(true);
    try {
      const cuponRef = doc(db, "cupones", codigoLimpio);

      const docSnap = await getDoc(cuponRef);
      if (docSnap.exists()) {
        alert(`El cupón "${codigoLimpio}" ya existe. Intentá nuevamente.`);
        return;
      }

      const cuponCompleto = {
        codigo: codigoLimpio,
        descripcion: datosForm.descripcion.trim(),
        descuento: Number(datosForm.descuento),
        vencimiento: datosForm.vencimiento, 
      };

      await setDoc(cuponRef, cuponCompleto);

      alert("¡Cupón agregado con éxito!");
      setDatosForm(estadoInicial);

      if (recargarCupones) {
        recargarCupones();
      }
    } catch (error) {
      console.error("Error al guardar el cupón:", error);
      alert("Hubo un error al guardar el cupón.");
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <FormularioCupones
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
    />
  );
}
