import { useState, useEffect } from "react";
import { db } from "../../firestore/config";
import { FormularioContainerCupones } from "./FormularioContainerCupones";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import styles from "./GestionCupones.module.css";
import { Cupon } from "../cupon/Cupon";

const GestionCupones = () => {
  const [cupones, setCupones] = useState([]);

  const obtenerEstiloPorMonto = (porcentaje) => {
    const monto = Number(porcentaje);
    if (monto >= 20) {
      return { fondo: "#D4AF37", texto: "#2C2208" };
    } else if (monto >= 10) {
      return { fondo: "#FF4757", texto: "#FFFFFF" };
    } else {
      return { fondo: "#9C6F44", texto: "#FFFFFF" };
    }
  };

  const obtenerCupones = async () => {
    try {
      const cuponesRef = collection(db, "cupones");
      const resp = await getDocs(cuponesRef);
      const lista = resp.docs.map((documento) => ({
        ...documento.data(),
        id: documento.id,
      }));

      setCupones(lista);
    } catch (error) {
      console.error("Error al obtener cupones:", error);
    }
  };

  
  useEffect(() => {
    obtenerCupones();
  }, []);

  
  const formatearFechaNativa = (fechaISO) => {
    if (!fechaISO) return "Sin vencimiento";

  
    const fecha = fechaISO?.toDate
      ? fechaISO.toDate()
      : new Date(`${fechaISO}T00:00:00`);

    if (isNaN(fecha.getTime())) return "Fecha inválida";

    return fecha.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDelete = async (idDocumento) => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea eliminar este cupón?"
    );
    if (!confirmacion) return;

    try {
      await deleteDoc(doc(db, "cupones", idDocumento));
      setCupones((prev) => prev.filter((cupon) => cupon.id !== idDocumento));
      alert("Cupón eliminado.");
    } catch (error) {
      console.error("Error al eliminar el cupón:", error);
      alert("No se pudo eliminar el cupón.");
    }
  };

  return (
    <section className={styles.contenedorPrincipal}>
      <header className={styles.headerTitulo}>
        <h2>Gestión de Cupones</h2>
      </header>

      <div className={styles.layoutGrid}>
        <aside className={styles.columnaFormulario}>
          <FormularioContainerCupones recargarCupones={obtenerCupones} />
        </aside>

        <div className={styles.columnaLista}>
          {cupones.map((cupon) => {
            const { fondo, texto } = obtenerEstiloPorMonto(cupon.descuento);
            const vence = formatearFechaNativa(cupon.vencimiento);

            return (
              <article key={cupon.id} className={styles.tarjetaHorizontal}>
                <div className={styles.caratula}>
                  <Cupon
                    descuento={cupon.descuento}
                    diagonal={cupon.diagonal}
                    colorFondo={fondo}
                    colorTexto={texto}
                  />
                </div>

                <div className={styles.infoJuego}>
                  <div className={styles.filaSuperior}>
                    <span className={styles.badgeId}>
                      # {cupon.codigo || cupon.id}
                    </span>
                    <h4 className={styles.tituloJuego}>{cupon.descuento}%</h4>
                  </div>
                  <span className={styles.precio}>Vence: {vence}</span>
                  <p
                    className={styles.descripcionCorta}
                    title={cupon.descripcion}
                  >
                    {cupon.descripcion}
                  </p>
                </div>

                <div className={styles.acciones}>
                  <button
                    type="button"
                    onClick={() => handleDelete(cupon.id)}
                    className={styles.btnEliminar}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GestionCupones;
