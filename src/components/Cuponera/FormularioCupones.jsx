import styles from "./FormularioCupones.module.css";
import { Cupon } from "../Cupon/Cupon";
import { useState } from "react";

export function FormularioCupones({ datosForm, manejarCambio, manejarEnvio }) {
  const [porcentaje, setPorcentaje] = useState("");
  const [estiloPorMonto, setEstiloPorMonto] = useState({
    fondo: "#A9A9A9",
    texto: "#FFFFFF",
  });

  const actualizarEstilo = (porcentaje) => {
    if (porcentaje >= 20) {
      setEstiloPorMonto({ fondo: "#D4AF37", texto: "#2C2208" });
    } else if (porcentaje >= 10) {
      setEstiloPorMonto({ fondo: "#FF4757", texto: "#FFFFFF" });
    } else {
      setEstiloPorMonto({ fondo: "#9C6F44", texto: "#FFFFFF" });
    }
  };

  const handleDescuento = (e) => {
    const nuevoValor = e.target.value;
    setPorcentaje(nuevoValor);
    actualizarEstilo(nuevoValor);
    manejarCambio(e);
  };
  const generarCodigoUnico = () => {
    return Date.now().toString(36).slice(-6).toUpperCase();
  };
  const [codigoUnico, setCodigoUnico] = useState(generarCodigoUnico());

  const onSubmitLocal = (e) => {
    e.preventDefault();

    const codigoFinal = `${codigoUnico}-${datosForm.codigo.trim().toUpperCase()}`;

    manejarEnvio(e, codigoFinal);

    setCodigoUnico(generarCodigoUnico());
  };

  return (
    <form className={styles.formulario} onSubmit={onSubmitLocal}>
      <h3 className={styles.tituloForm}>Agregar Nuevo Cupon</h3>

      <div className={styles.filaDoble}>
        <div className={styles.campo}>
          <label htmlFor="idAu">ID (Automatico)</label>
          <input
            id="idAu"
            type="text"
            name="idAu"
            value={codigoUnico}
            disabled
            required
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="codigo">ID (Descriptivo)</label>
          <input
            id="codigo"
            type="text"
            name="codigo"
            placeholder="Ej: NAVIDAD"
            value={datosForm.codigo}
            onChange={manejarCambio}
            required
          />
        </div>
      </div>

      <div className={styles.campo}>
        <label htmlFor="descripcion">Descripcion</label>
        <input
          id="descripcion"
          type="text"
          placeholder="Ej: Descuento Segunda Producto"
          name="descripcion"
          value={datosForm.descripcion}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className={styles.campo}>
        <Cupon
          descuento={porcentaje}
          diagonal={true}
          colorFondo={estiloPorMonto.fondo}
          colorTexto={estiloPorMonto.texto}
        />
      </div>

      <div className={styles.filaDoble}>
        <div className={styles.campo}>
          <label htmlFor="descuento">Descuento (%)</label>
          <input
            id="descuento"
            type="number"
            min={0}
            step="0.01"
            name="descuento"
            value={datosForm.descuento}
            onChange={handleDescuento}
            required
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="vencimiento">Vencimiento</label>
          <input
            id="vencimiento"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            name="vencimiento"
            value={datosForm.vencimiento}
            onChange={manejarCambio}
            required
          />
        </div>
      </div>

      <div className={styles.grupoBotones}>
        <button type="submit" className={styles.btnSubmit}>
          Guardar Cupon
        </button>
      </div>
    </form>
  );
}
