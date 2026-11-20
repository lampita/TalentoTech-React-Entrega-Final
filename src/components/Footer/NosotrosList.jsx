import { Spinner } from "../Spinner/Spinner";
import { useState, useEffect } from "react";
import styles from "./NosotrosList.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firestore/config";

function NosotrosList({ Mensaje, onCerrar }) {
  const [nosotros, setNosotros] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

useEffect(() => {
  const obtenerMiembros = async () => {
    try {
      const personasDB = collection(db, "nosotros");
      const query = await getDocs(personasDB);

      if (query.empty) {
        throw new Error("No se encontraron miembros en la base de datos");
      }

      const listaMiembros = query.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNosotros(listaMiembros);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  obtenerMiembros();
}, []);


  if (cargando) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className={styles.mensajeErro}>
        <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.contenedorMain}>
      <div className={styles.contenedorCabecera}>
        <h3>{Mensaje}</h3>

        <button
          className={styles.botonCerrar}
          onClick={onCerrar}
          onMouseOver={(e) => (e.target.style.background = "#c0392b")}
          onMouseOut={(e) => (e.target.style.background = "#e74c3c")}
        >
          ✕
        </button>
      </div>

      <ul className={styles.estiloLista}>
        {nosotros.map((miembro) => (
          <li key={miembro.id} className={styles.tarjeta}>
            <img
              src={miembro.foto}
              alt={miembro.nombre}
              className={styles.foto}
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <h3>{miembro.nombre}</h3>
              <span className={styles.fontCargo}>{miembro.cargo}</span>
              <span className={styles.fontMail}>{miembro.mail}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NosotrosList;
